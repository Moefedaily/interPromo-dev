import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authService = {
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post("/login", credentials);
      const user = response.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  register: async (data) => {
    try {
      const response = await axiosInstance.post("/register", data);
      const user = response.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post("/logout");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },

  updateUserProfile: async (userData) => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || !currentUser.id) {
      throw new Error("User not authenticated");
    }

    try {
      const response = await axiosInstance.put(
        `/user/${currentUser.id}/edit`,
        userData
      );
      const updatedUser = response.data;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      console.error("Profile update error:", error);
      throw error;
    }
  },

  getCurrentUser: () => {
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("user");
  },
  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user ? user.isAdmin : false;
  },
};
