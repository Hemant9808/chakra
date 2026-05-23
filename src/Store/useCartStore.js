import { create } from "zustand";
import { toast } from "react-hot-toast";
import cartService from "../services/cartService";
import useAuthStore from "./useAuthStore";

const loadCartItems = () => {
  try {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return [];
  }
};

export const useCartStore = create((set) => ({
  cartItems: loadCartItems(),
  loading: false,
  error: null,

  fetchCart: async () => {
    try {
      if (!useAuthStore.getState().isAuthenticated) {
        // Just rely on local state for guests
        return;
      }
      set({ loading: true, error: null });
      const cart = await cartService.getCart();
      const items = cart.items || [];
      set({ cartItems: items, loading: false });
      localStorage.setItem('cartItems', JSON.stringify(items));
    } catch (error) {
      set({ error: error.message, loading: false });
      // Only toast error if it's not a missing auth token error
      if (error.message !== "User not logged in") {
        toast.error(error.message);
      }
    }
  },

  addToCart: async (product) => {
    try {
      set({ loading: true, error: null });
      
      if (!useAuthStore.getState().isAuthenticated) {
        // Guest Cart Logic - Fully Immutable and Robust ID Matching
        const currentItems = useCartStore.getState().cartItems;
        const targetId = product._id || product.id;

        if (!targetId) {
          toast.error("Invalid product");
          set({ loading: false });
          return;
        }

        const existingItemIndex = currentItems.findIndex((item) => {
          const itemId = item.productId?._id || item.productId?.id || item.productId;
          return itemId && targetId && String(itemId) === String(targetId);
        });

        let updatedItems;
        if (existingItemIndex >= 0) {
          // Immutably update quantity of the existing item
          updatedItems = currentItems.map((item, index) => 
            index === existingItemIndex 
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          // Immutably append the new item
          updatedItems = [
            ...currentItems,
            {
              productId: product, // Store full product object for rendering
              quantity: 1,
              price: product.price,
              discountPrice: product.discountPrice
            }
          ];
        }
        
        set({ cartItems: updatedItems, loading: false });
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        toast.success("Added to cart!");
        return;
      }

      // Authenticated Logic - Calculate the correct new quantity instead of resetting it to 1
      const currentItems = useCartStore.getState().cartItems;
      const existingItem = currentItems.find((item) => {
        const itemId = item.productId?._id || item.productId?.id || item.productId;
        const targetId = product._id || product.id;
        return itemId && targetId && String(itemId) === String(targetId);
      });
      const newQuantity = existingItem ? existingItem.quantity + 1 : 1;

      await cartService.addToCart(product._id, newQuantity, product.price, product.discountPrice);
      const freshCart = await cartService.getCart();
      const items = freshCart.items || [];
      set({ cartItems: items, loading: false });
      localStorage.setItem('cartItems', JSON.stringify(items));
      toast.success("Added to cart!");
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(error.message);
    }
  },

  removeItem: async (productId) => {
    try {
      // 1. Optimistically remove item from local state immediately for instant UX
      const targetId = productId;
      const currentItems = useCartStore.getState().cartItems.filter((item) => {
        const itemId = item.productId?._id || item.productId?.id || item.productId;
        return !itemId || !targetId || String(itemId) !== String(targetId);
      });
      set({ cartItems: currentItems }); // Updates UI immediately, no page loader
      localStorage.setItem('cartItems', JSON.stringify(currentItems));
      toast.success("Item removed from cart");

      if (!useAuthStore.getState().isAuthenticated) {
        // Guest Cart is fully done locally
        return;
      }

      // 2. Perform backend update silently in background and sync
      await cartService.removeFromCart(productId);
      const freshCart = await cartService.getCart();
      const items = freshCart.items || [];
      set({ cartItems: items });
      localStorage.setItem('cartItems', JSON.stringify(items));
    } catch (error) {
      // Revert to sync with server on error
      const freshCart = await cartService.getCart().catch(() => null);
      if (freshCart) {
        set({ cartItems: freshCart.items || [] });
      }
      toast.error(error.message || "Failed to remove item");
    }
  },

  updateQuantity: async (productId, quantity, price, discountPrice) => {
    try {
      // 1. Optimistically update item quantity in local state immediately for instant UX
      const currentItems = useCartStore.getState().cartItems;
      const targetId = productId;

      if (!targetId) return;

      const itemIndex = currentItems.findIndex((item) => {
        const itemId = item.productId?._id || item.productId?.id || item.productId;
        return itemId && targetId && String(itemId) === String(targetId);
      });

      if (itemIndex >= 0) {
        const optimisticItems = currentItems.map((item, index) =>
          index === itemIndex
            ? { ...item, quantity: quantity }
            : item
        );
        set({ cartItems: optimisticItems }); // Updates UI immediately, no page loader
        localStorage.setItem('cartItems', JSON.stringify(optimisticItems));
      }

      if (!useAuthStore.getState().isAuthenticated) {
        // Guest Cart is fully done locally
        return;
      }

      // 2. Perform backend update silently in background and sync
      await cartService.addToCart(productId, quantity, price, discountPrice);
      const freshCart = await cartService.getCart();
      const items = freshCart.items || [];
      set({ cartItems: items });
      localStorage.setItem('cartItems', JSON.stringify(items));
    } catch (error) {
      // Revert to sync with server on error
      const freshCart = await cartService.getCart().catch(() => null);
      if (freshCart) {
        set({ cartItems: freshCart.items || [] });
      }
      toast.error(error.message || "Failed to update quantity");
    }
  },
  clearCart: async () => {
    try {
      set({ loading: true, error: null });

      if (!useAuthStore.getState().isAuthenticated) {
        set({ cartItems: [], loading: false });
        localStorage.removeItem('cartItems');
        toast.success("Cart cleared");
        return;
      }

      await cartService.clearCart();
      set({ cartItems: [], loading: false });
      localStorage.removeItem('cartItems');
      toast.success("Cart cleared");
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(error.message);
    }
  },

  mergeGuestCart: async () => {
    try {
      const items = loadCartItems();
      if (items.length === 0) {
        await useCartStore.getState().fetchCart();
        return;
      }
      
      // Fetch user's current database cart first to avoid overwriting existing quantities
      let dbCart = null;
      try {
        dbCart = await cartService.getCart();
      } catch (err) {
        console.error("Failed to fetch database cart for merge, proceeding without it", err);
      }
      const dbItems = dbCart?.items || [];
      
      // Send all local items to the backend, adding quantities for overlapping items
      for (const item of items) {
        const id = item.productId?._id || item.productId?.id || item.productId;
        if (id) {
          const dbItem = dbItems.find(dbi => {
            const dbId = dbi.productId?._id || dbi.productId?.id || dbi.productId;
            return dbId && id && String(dbId) === String(id);
          });
          const finalQuantity = dbItem ? dbItem.quantity + item.quantity : item.quantity;
          
          // We use addToCart service to append to user's real cart
          await cartService.addToCart(id, finalQuantity, item.price, item.discountPrice);
        }
      }
      
      // Fetch the newly merged cart from the server
      await useCartStore.getState().fetchCart();
    } catch (error) {
      console.error("Failed to merge guest cart:", error);
    }
  },

  clearLocalCart: () => {
    set({ cartItems: [] });
    localStorage.removeItem('cartItems');
  },

  getTotalItems: () => {
    return useCartStore.getState().cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  },

  getTotalDiscountPrice: () => {
    return useCartStore.getState().cartItems.reduce(
      (total, item) => total + item.discountPrice * item.quantity,
      0
    );
  },

  getTotalPrice: () => {

    return useCartStore.getState().cartItems.reduce(
      (total, item) => total + item.discountPrice * item.quantity,
      0
    );
  },
}));
