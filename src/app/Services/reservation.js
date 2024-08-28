import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const reservationService = {
  getUserFromLocalStorage: () => {
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  },

  getAvailability: async () => {
    try {
      const response = await axiosInstance.get("/reservation/availability");
      return response.data;
    } catch (error) {
      console.error("Error fetching availability:", error);
      throw new Error("Failed to fetch availability");
    }
  },

  checkExistingReservation: async (date, service) => {
    const user = reservationService.getUserFromLocalStorage();
    if (!user) {
      throw new Error("User not authenticated");
    }

    try {
      console.log("Checking reservation with data:", {
        date,
        service,
        user_id: user.id,
      });
      const response = await axiosInstance.post("/reservation/check", {
        date,
        service,
        user_id: user.id,
      });
      console.log("Received response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error checking existing reservation:", error);
      throw new Error(
        `Failed to check existing reservation: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  },

  createReservation: async (reservationData) => {
    const user = reservationService.getUserFromLocalStorage();
    if (!user) {
      throw new Error("User not authenticated");
    }

    try {
      const response = await axiosInstance.post("/reservation/new", {
        ...reservationData,
        user_id: user.id,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating reservation:", error);
      throw new Error("Failed to create reservation");
    }
  },
  getReservation: async (id) => {
    try {
      console.log("Reservation ID:", id);
      const response = await axiosInstance.get(`/reservation/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch reservation");
    }
  },

  updateReservation: async (id, reservationData) => {
    try {
      const response = await axiosInstance.put(
        `/reservation/${id}/edit`,
        reservationData
      );
      console.log("Reservation updated successfully:", response.data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to update reservation");
    }
  },

  deleteReservation: async (id) => {
    try {
      const response = await axiosInstance.delete(`/reservation/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to delete reservation");
    }
  },

  getReservations: async () => {
    try {
      const response = await axiosInstance.get("/reservations");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch reservations");
    }
  },
};
