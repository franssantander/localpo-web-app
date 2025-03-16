import { create } from "zustand";

interface SidebarType {
  title: string;
  path: string;
  component: string;
  icon: string;
}

interface UserType {
  avatar: string;
  name: string;
  company: string;
}

interface UserDataType {
  sidebar: SidebarType[];
  user: UserType;
}

interface UserStore {
  userData: UserDataType | null;
  setUserData: (data: UserDataType | UserDataType) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userData: null,
  setUserData: (data) => set(() => ({ userData: data })),
}));
