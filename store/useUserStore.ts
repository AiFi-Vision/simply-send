import { create } from "zustand";
import { ImageProps } from "react-native";
import * as SecureStore from "expo-secure-store";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  birthdate: Date;
  country: string;
  avatar: ImageProps;
  token: string;
  address: string;
  address2: string;
  city: string;
  postcode: string;
  isVerified: boolean;
  link: string;
  emailVerify: boolean;
  selfieVerify: boolean;
  docVerify: boolean;
};

type UserStore = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  loadUserFromStorage: () => Promise<void>;
};

const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: async (newData: Partial<User>) => {
    set((state) => {
      if (!state.user) return state;

      const updatedUser = { ...state.user, ...newData };

      // Save updated user to secure storage
      SecureStore.setItemAsync("user", JSON.stringify(updatedUser));

      return { user: updatedUser };
    });
  },

  login: async (user) => {
    await SecureStore.setItemAsync("user", JSON.stringify(user));
    set({ user, isAuthenticated: true });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync("user");
    set({ user: null, isAuthenticated: false });
  },

  loadUserFromStorage: async () => {
    const storedUser = await SecureStore.getItemAsync("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      set({ user, isAuthenticated: true });
    }
  },
}));

export default useUserStore;
