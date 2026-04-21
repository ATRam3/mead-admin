import { create } from "zustand";
import { getUsers, getPayments } from "../services/analyticsService";
import { calculateStats } from "../utils/calculateStats";

export const useDashboardStorage = create((set, get) => ({
  stats: null,
  loading: false,
  loaded: false,

  fetchStats: async () => {
    if (get().loaded) return;
    set({ loading: true });
    try {
      const users = await getUsers();
      const payments = await getPayments();
      const result = calculateStats(users, payments);
      set({ stats: result, loading: false, loaded: true });
    } catch (error) {
      console.error("Failed to load dashboard stats:", error);
      set({ loading: false });
    }
  },

  refreshStats: async () => {
    set({ loading: true });
    try {
      const users = await getUsers();
      const payments = await getPayments();
      const result = calculateStats(users, payments);
      set({ stats: result, loading: false, loaded: true });
    } catch (error) {
      console.error("Failed to refresh dashboard stats:", error);
      set({ loading: false });
    }
  },
}));
