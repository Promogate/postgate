import { createWithEqualityFn } from "zustand/traditional"

export type State = {
  user: string | null;
  setUser: (id: string) => void;
}

export const useUser = createWithEqualityFn<State>((set, get) => ({
  user: null,
  setUser: (id: string) => {
    set({ user: id });
  }
}))