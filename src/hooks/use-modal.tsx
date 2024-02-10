import { create } from "zustand";

interface UseModal {
  isOpen: boolean;
  modal: string | null;
  onOpen: (modal: string) => void;
  onClose: (modal: string) => void;
}

export const useModal = create<UseModal>((set) => ({
  isOpen: false,
  modal: null,
  onOpen: (modal: string) => set({ modal: modal, isOpen: true }),
  onClose: (modal: string) => set({ modal: modal, isOpen: false }),
}))