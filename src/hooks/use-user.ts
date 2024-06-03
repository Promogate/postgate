import { User } from "@/@types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  user: null | User;
  token: null | string;
  setUser: (input: { user: User, token: string }) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      setUser: (input) => {
        set({
          token: input.token,
          user: input.user,
          isAuthenticated: true
        });
      },
      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false
        });
      }
    }),
    {
      name: "authentication",
    }
  )
);

export default useAuthStore;