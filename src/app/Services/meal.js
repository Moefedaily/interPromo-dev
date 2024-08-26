import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const axiosIns = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const mealService = {
  getAllMeals: async () => {
    try {
      const response = await axiosIns.get("/meals");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch meals");
    }
  },

  getMeal: async (id) => {
    try {
      const response = await axiosIns.get(`/meal/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch meal");
    }
  },

  createMeal: async (mealData) => {
    try {
      const response = await axiosIns.post("/meal/new", mealData);
      return response.data;
    } catch (error) {
      throw new Error("Failed to create meal");
    }
  },

  updateMeal: async (id, mealData) => {
    try {
      const response = await axiosIns.put(`/meal/${id}/edit`, mealData);
      return response.data;
    } catch (error) {
      throw new Error("Failed to update meal");
    }
  },

  deleteMeal: async (id) => {
    try {
      await axiosIns.delete(`/meal/${id}`);
    } catch (error) {
      throw new Error("Failed to delete meal");
    }
  },
};
