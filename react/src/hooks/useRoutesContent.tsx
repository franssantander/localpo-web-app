import { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endpoints";

interface RoutesContentType {
  component: string;
  path: string;
  title: string
}

export const useRoutesContent = () => {
  const [routes, setRoutes] = useState<RoutesContentType[]>([]);
  const { setUserData } = useUserStore();

  const requestRoutes = async () => {
    try {
      const res = await axiosClient.get(API_ENDPOINTS.EMP_SIDEBAR_LINKS);

      setRoutes(res.data.sidebar);
      setUserData(res.data);
    } catch (error) {
      console.error(error);
      // navigate("/");
    }
  };

  useEffect(() => {
    requestRoutes();
  }, []);

  return { routes };
};
