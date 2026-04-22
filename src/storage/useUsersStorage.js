import { create } from "zustand";
import {
  getTotalUsersCount,
  getFirstPageUsers,
  getNextPageUsers,
  getPreviousPageUsers,
  searchUsers,
} from "../services/userServices";

const PAGE_SIZE = 30;

export const useUsersStorage = create((set, get) => ({
  users: [],
  loading: false,
  loaded: false,
  totalCount: 0,
  currentPage: 1,
  lastVisible: null,
  firstVisible: null,
  hasNextPage: false,
  hasPreviousPage: false,
  isSearching: false,

  // Search users
  searchUsersAction: async (term) => {
    if (!term) {
      set({ isSearching: false, loaded: false });
      await get().fetchUsers();
      return;
    }
    set({ isSearching: true });
    try {
      const users = await searchUsers(term);
      set({
        users,
        hasNextPage: false,
        hasPreviousPage: false,
        isSearching: false,
      });
    } catch (error) {
      console.error("Failed to search users:", error);
      set({ isSearching: false });
    }
  },

  // Initial fetch (first page)
  fetchUsers: async () => {
    if (get().loaded) return;
    set({ loading: true });
    try {
      const total = await getTotalUsersCount();
      const { users, lastVisible, firstVisible } =
        await getFirstPageUsers(PAGE_SIZE);
      set({
        users,
        totalCount: total,
        currentPage: 1,
        lastVisible,
        firstVisible,
        hasNextPage: users.length === PAGE_SIZE,
        hasPreviousPage: false,
        loading: false,
        loaded: true,
      });
    } catch (error) {
      console.error("Failed to fetch users:", error);
      set({ loading: false });
    }
  },

  // Go to next page
  nextPage: async () => {
    const { lastVisible, currentPage } = get();
    if (!lastVisible) return;
    set({ loading: true });
    try {
      const {
        users,
        lastVisible: newLast,
        firstVisible: newFirst,
      } = await getNextPageUsers(lastVisible, PAGE_SIZE);
      set((state) => ({
        users,
        currentPage: state.currentPage + 1,
        lastVisible: newLast,
        firstVisible: newFirst,
        hasNextPage: users.length === PAGE_SIZE,
        hasPreviousPage: true,
        loading: false,
      }));
    } catch (error) {
      console.error("Failed to fetch next page:", error);
      set({ loading: false });
    }
  },

  // Go to previous page
  previousPage: async () => {
    const { firstVisible, currentPage } = get();
    if (!firstVisible || currentPage <= 1) return;
    set({ loading: true });
    try {
      const {
        users,
        lastVisible: newLast,
        firstVisible: newFirst,
      } = await getPreviousPageUsers(firstVisible, PAGE_SIZE);
      set((state) => ({
        users,
        currentPage: state.currentPage - 1,
        lastVisible: newLast,
        firstVisible: newFirst,
        hasNextPage: true,
        hasPreviousPage: state.currentPage - 1 > 1,
        loading: false,
      }));
    } catch (error) {
      console.error("Failed to fetch previous page:", error);
      set({ loading: false });
    }
  },

  // Refresh current page (e.g., after toggling Pro status)
  refreshUsers: async () => {
    const { currentPage } = get();
    set({ loading: true });
    try {
      const total = await getTotalUsersCount();
      let result;
      if (currentPage === 1) {
        result = await getFirstPageUsers(PAGE_SIZE);
      } else {
        // To refresh a specific page we would need to re-fetch from the beginning
        // For simplicity, we refetch first page and reset pagination
        result = await getFirstPageUsers(PAGE_SIZE);
      }
      const { users, lastVisible, firstVisible } = result;
      set({
        users,
        totalCount: total,
        currentPage: 1,
        lastVisible,
        firstVisible,
        hasNextPage: users.length === PAGE_SIZE,
        hasPreviousPage: false,
        loading: false,
        loaded: true,
      });
    } catch (error) {
      console.error("Failed to refresh users:", error);
      set({ loading: false });
    }
  },
}));
