import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { router } from "./router";

const errorRedirectMap: Record<number, string> = {
  401: "/error/unauthorized",
  403: "/error/forbidden",
  404: "/error/not-found",
  500: "/error/server-error",
  502: "/error/bad-gateway",
  503: "/error/service-unavailable",
};

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
);

axiosInstance.interceptors.response.use(
  function (response: AxiosResponse) {
    console.log("Response received:", response);
    return response;
  },
  async function (error: AxiosError) {
    const response = error.response;
    const status = response?.status;
    console.error("Error response received:", response);
    if (status && errorRedirectMap[status]) {
      const targetPath = errorRedirectMap[status];

      if (response && router.state.location.pathname !== targetPath) {
        console.log("Navigating to error page:", targetPath, "with state:", response.data);
        void router.navigate(targetPath, { state: response.data });
      } else {
        console.log("Already on the target error page:", targetPath);
      }
    }

    return Promise.reject(error);
  },
);
