import { create } from "zustand";

interface useControlledSheetProps {
  sheetName: string | null;
  isOpen: boolean;
  onOpen: (sheetName: string) => void;
  onClose: (sheetName: string) => void;
}

export const useControlledSheet = create<useControlledSheetProps>((set) => ({
  sheetName: null,
  isOpen: false,
  onOpen: (sheetName: string) => set({ isOpen: true, sheetName: sheetName }),
  onClose: (sheetName: string) => set({ isOpen: false, sheetName: sheetName }),
}))