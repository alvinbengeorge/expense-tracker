// apiClient.ts
import axios from "axios";
import { getToken } from "./session";

export interface ApiResponse {
  status: "success" | "error";
  data?: any;
  error?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.authorization = token;
  }
  return config;
});

export const handleResponse = (response: any): ApiResponse => ({
  status: "success",
  data: response.data,
});

export const handleError = (error: any): ApiResponse => {
  if (error.response) {
    return {
      status: "error",
      error:
        error.response.data.error || "An error occurred. Please try again.",
    };
  } else {
    return {
      status: "error",
      error: "Network error. Please check your connection.",
    };
  }
};

export default apiClient;
