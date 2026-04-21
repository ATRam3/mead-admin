import { create } from "zustand";
import { getUsers } from "../services/userServices";

export const useUsersStorage = create((set, get) => ({
  users: [],
  loading: false,
  loaded: false,

  fetchUsers: async () => {
    if (get().loaded) return;

    set({ loading: true });

    try {
      const data = await getUsers();
      set({
        users: data,
        loading: false,
        loaded: true,
      });
    } catch (error) {
      console.error("Failed to fetch users:", error);
      set({ loading: false });
    }
  },

  refreshUsers: async () => {
    set({ loading: true });
    try {
      const data = await getUsers();

      set({
        users: data,
        loading: false,
        loaded: true,
      });
    } catch (error) {
      console.error("Failed to refresh users:", error);
      set({ loading: false });
    }
  },
}));
