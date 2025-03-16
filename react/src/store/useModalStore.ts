import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  modalType: string | null;
  actionName: string | null;
  url: string | null;
  modalData: any | null;
  openModal: (modalType: string, modalData?: any, actionName: string, url: string | null) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  modalType: null,
  actionName: null,
  url: null,
  modalData: null,
  handleMenuClick: () => set({}),
  openModal: (modalType, modalData = null, actionName, url) =>
    set({ isOpen: true, modalType, modalData, actionName, url }),
  closeModal: () => set({ isOpen: false, modalType: null, modalData: null }),
}));
