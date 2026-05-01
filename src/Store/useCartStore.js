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
        // Guest Cart Logic
        const currentItems = [...useCartStore.getState().cartItems];
        const existingItemIndex = currentItems.findIndex(
          (item) => item.productId?._id === product._id || item.productId === product._id
        );

        if (existingItemIndex >= 0) {
          currentItems[existingItemIndex].quantity += 1;
        } else {
          currentItems.push({
            productId: product, // Store full product object for rendering
            quantity: 1,
            price: product.price,
            discountPrice: product.discountPrice
          });
        }
        
        set({ cartItems: currentItems, loading: false });
        localStorage.setItem('cartItems', JSON.stringify(currentItems));
        toast.success("Added to cart!");
        return;
      }

      // Authenticated Logic
      const cart = await cartService.addToCart(product._id, 1, product.price, product.discountPrice);
      const items = cart.items || [];
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
      set({ loading: true, error: null });

      if (!useAuthStore.getState().isAuthenticated) {
        // Guest Cart Logic
        const currentItems = useCartStore.getState().cartItems.filter(
          (item) => item.productId?._id !== productId && item.productId !== productId
        );
        set({ cartItems: currentItems, loading: false });
        localStorage.setItem('cartItems', JSON.stringify(currentItems));
        toast.success("Item removed from cart");
        return;
      }

      const cart = await cartService.removeFromCart(productId);
      const items = cart.items || [];
      set({ cartItems: items, loading: false });
      localStorage.setItem('cartItems', JSON.stringify(items));
      toast.success("Item removed from cart");
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(error.message);
    }
  },

  updateQuantity: async (productId, quantity, price, discountPrice) => {
    try {
      set({ loading: true, error: null });

      if (!useAuthStore.getState().isAuthenticated) {
        // Guest Cart Logic
        const currentItems = [...useCartStore.getState().cartItems];
        const itemIndex = currentItems.findIndex(
          (item) => item.productId?._id === productId || item.productId === productId
        );

        if (itemIndex >= 0) {
          currentItems[itemIndex].quantity = quantity;
          set({ cartItems: currentItems, loading: false });
          localStorage.setItem('cartItems', JSON.stringify(currentItems));
        }
        return;
      }

      const cart = await cartService.addToCart(productId, quantity, price, discountPrice);
      const items = cart.items || [];
      set({ cartItems: items, loading: false });
      localStorage.setItem('cartItems', JSON.stringify(items));
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(error.message);
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
      
      // Send all local items to the backend
      for (const item of items) {
        const id = item.productId?._id || item.productId;
        if (id) {
          // We use addToCart service to append to user's real cart
          await cartService.addToCart(id, item.quantity, item.price, item.discountPrice);
        }
      }
      
      // Fetch the newly merged cart from the server
      await useCartStore.getState().fetchCart();
    } catch (error) {
      console.error("Failed to merge guest cart:", error);
    }
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
