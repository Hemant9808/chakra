import { create } from "zustand";
import { toast } from "react-hot-toast";
import cartService from "../services/cartService";

// Load cart items from localStorage on store creation
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

  // Fetch cart from backend
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

  // Add item to cart
  addToCart: async (product) => {
    try {
      set({ loading: true, error: null });
      const cart = await cartService.addToCart(product._id, 1, product.price);
      const items = cart.items || [];
      set({ cartItems: items, loading: false });
      localStorage.setItem('cartItems', JSON.stringify(items));
      toast.success("Added to cart!");
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(error.message);
    }
  },

  // Remove item from cart
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

  // Update item quantity
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

  // Clear entire cart
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

  // Calculate total items
  getTotalItems: () => {
    return useCartStore.getState().cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  },

  // Calculate total price
  getTotalPrice: () => {
    return useCartStore.getState().cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
}));
