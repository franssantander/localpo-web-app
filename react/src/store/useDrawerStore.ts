import { create } from "zustand";

interface DrawerState {
  isOpen: boolean;
  url: string | null;
  drawerData: any | null;
  openDrawer: (modalType: string, drawerData?: any, url: string | null) => void;
  closeDrawer: () => void;
}

export const useDrawerStore = create<DrawerState>((set) => ({
  isOpen: false,
  url: null,
  drawerData: null,
  handleMenuClick: () => set({}),
  openDrawer: (drawerData = null, url) =>
    set({ isOpen: true, drawerData, url }),
  closeDrawer: () => set({ isOpen: false, drawerData: null }),
  clearDrawerData: () => set({ drawerData: null }),
}));
