import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
});

axiosClient.interceptors.request.use(
  (config) => {
    const authUser = Cookies.get("authUser");
    if (authUser) {
      const parsedAuthUser = JSON.parse(authUser);
      const token = parsedAuthUser.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response?.status === 401) {
    //   Cookies.remove("authUser");
    //   window.location.href = "/sign-in";
    // }
    return Promise.reject(error);
  }
);

export default axiosClient;
