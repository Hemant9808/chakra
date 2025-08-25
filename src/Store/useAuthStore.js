import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../axios";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const response = await axiosInstance.post("/auth/login", {
            email,
            password,
          });

          const { token, user } = response.data;

          set({
            user,
            token,
            isAuthenticated: true,
            loading: false,
            error: null,
          });

          return response.data;
        } catch (error) {
          set({
            loading: false,
            error: error.response?.data?.message || "Login failed",
            user: null,
            token: null,
            isAuthenticated: false,
          });
          throw error;
        }
      },

      signup: async (userData) => {
        set({ loading: true, error: null });
        try {
          const response = await axiosInstance.post("/auth/generate-signup-otp", userData);

          const { token, user } = response.data;

          console.log("user....................",token,user);

          set({

            user,
            token,
            isAuthenticated: false,
            loading: false,
            error: null,

          });

          return response.data;
        } catch (error) {
          set({
            loading: false,
            error: error.response?.data?.message || "Signup failed",
            user: null,
            token: null,
            isAuthenticated: false,
          });
          throw error;
        }
      },

      verifySignupOTP: async (userData) => {
        set({ loading: true, error: null });
        try {
          const response = await axiosInstance.post("/auth/verify-signup-otp", userData);

          const { token, user } = response.data;

          set({
            user,
            token,
            isAuthenticated: true,
            loading: false,
            error: null,
          });

          return response.data;
        } catch (error) {
          set({
            loading: false,
            error: error.response?.data?.message || "Signup failed",
            user: null,
            token: null,
            isAuthenticated: false,
          });
          throw error;
        }
      },

      forgotPassword: async (email) => {
        set({ loading: true, error: null });
        try {
          const response = await axiosInstance.post("/auth/forgotPassword", {
            email,
          });
          set({ loading: false });
          return response.data;
        } catch (error) {
          set({
            loading: false,
            error: error.response?.data?.message || "Password reset request failed",
          });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
        localStorage.removeItem("auth-storage");
      },

      updateProfile: async (userData) => {
        set({ loading: true, error: null });
        try {
          const response = await axiosInstance.put('/auth/updateProfile', userData);
          const updatedUser = response.data.user;
          
          set((state) => ({
            user: { ...state.user, ...updatedUser },
            loading: false,
            error: null,
          }));
          
          return response.data;
        } catch (error) {
          set({
            loading: false,
            error: error.response?.data?.message || 'Failed to update profile',
          });
          throw error;
        }
      },
      deleteAccount: async (email) => {
        set({ loading: true, error: null });
        try {
          const response = await axiosInstance.post("/auth/deleteAccount", { email });
          localStorage.removeItem("auth-storage");
          logout();
          return response.data;
        } catch (error) {
          set({ loading: false, error: error.response?.data?.message || "Failed to delete account" });
          throw error;
        }
      },
      getUserDetails: async (userId) => {
        set({ loading: true, error: null });
        try {
          const response = await axiosInstance.post("/auth/getUserDetails", { userId });
          const { token, user } = response.data;
          set({
            user,
            token,
            isAuthenticated: true,
            loading: false,
            error: null,
          });
          return response.data;
        } catch (error) {
          set({ loading: false, error: error.response?.data?.message || "Failed to get user details" });
          throw error;
        }
      }
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore; 