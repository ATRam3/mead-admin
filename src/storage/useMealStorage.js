import { create } from "zustand";
import { useEffect, useState } from "react";
import { getMeals } from "../services/mealsService";

export const useMealStorage = create((set, get) => ({
  meals: [],
  loading: false,
  loaded: false,

  fetchMeals: async () => {
    if (get().loaded) return;

    set({ loading: true });

    try {
      const data = await getMeals();

      set({
        meals: data,
        loading: false,
        loaded: true,
      });
    } catch (error) {
      console.error("Failed to fetch meals:", error);
      set({ loading: false });
    }
  },

  refreshMeals: async () => {
    set({ loading: true });
    try {
      const data = await getMeals();

      set({
        meals: data,
        loading: false,
        loaded: true,
      });
    } catch (error) {
      console.error("Failed to refresh meals:", error);
      set({ loading: false });
    }
  },
}));
