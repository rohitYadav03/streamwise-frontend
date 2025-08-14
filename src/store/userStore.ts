import { create } from 'zustand'

// Define User interface based on your backend MongoDB User model
interface User {
  _id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UserStore {
  // State
  user: User | null;
  isLoading: boolean;
  
  // Actions - Same as Redux actions (addUser, removeUser)
  addUser: (user: User) => void;      // Equivalent to Redux addUser action
  removeUser: () => void;             // Equivalent to Redux removeUser action
  setLoading: (loading: boolean) => void;
  
  // Helper methods
  isAuthenticated: () => boolean;
}

const useUserStore = create<UserStore>((set, get) => ({
  // Initial state (same as Redux initialState: null)
  user: null,
  isLoading: false,
  
  // Actions
  addUser: (user: User) => {
    console.log('Adding user to store:', user);
    set({ user });
  },
  
  removeUser: () => {
    console.log('Removing user from store');
    set({ user: null });
  },
  
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  
  // Helper to check authentication
  isAuthenticated: () => {
    const state = get();
    return state.user !== null;
  }
}));

export default useUserStore;

// Why this structure?
// 1. addUser/removeUser - matches Redux pattern from commit
// 2. User interface - matches your MongoDB schema
// 3. Single source of truth - just like Redux store
// 4. Console logs - for debugging like original commit