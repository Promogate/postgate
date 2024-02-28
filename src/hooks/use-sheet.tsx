import { create } from "zustand";

interface useSheetProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSheet = create<useSheetProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))