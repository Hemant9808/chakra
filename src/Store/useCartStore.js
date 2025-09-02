import { create } from "zustand";
import { toast } from "react-hot-toast";
import cartService from "../services/cartService";

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
      set({ loading: true, error: null });
      const cart = await cartService.getCart();
      const items = cart.items || [];
      set({ cartItems: items, loading: false });
      localStorage.setItem('cartItems', JSON.stringify(items));
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(error.message);
    }
  },

  addToCart: async (product) => {
    try {
      console.log("product",product)
      set({ loading: true, error: null });
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

  updateQuantity: async (productId, quantity) => {
    try {
      set({ loading: true, error: null });
      const cart = await cartService.addToCart(productId, quantity);
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
      await cartService.clearCart();
      set({ cartItems: [], loading: false });
      localStorage.removeItem('cartItems');
      toast.success("Cart cleared");
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(error.message);
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
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
}));
