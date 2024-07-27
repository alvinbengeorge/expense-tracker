import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ApiResponse {
  status: "success" | "error";
  data?: any;
  error?: string;
}

const handleResponse = (response: any): ApiResponse => {
  return {
    status: "success",
    data: response.data,
  };
};

const handleError = (error: any): ApiResponse => {
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

export const createUser = async (
  username: string,
  password: string
): Promise<ApiResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create_user`, {
      username,
      password,
    });
    const result = await loginUser(username, password);
    return handleResponse(result);
  } catch (error) {
    console.error("Create user error:", error);
    return handleError(error);
  }
};

export const loginUser = async (
  username: string,
  password: string
): Promise<ApiResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password,
    });

    const { token } = response.data;

    if (token) {
      document.cookie = `token=${token}; path=/`;
      return handleResponse(response);
    } else {
      return {
        status: "error",
        error: "Unexpected error: No token received.",
      };
    }
  } catch (error: any) {
    if (error.response && error.response.data.error === "User does not exist") {
      return await createUser(username, password);
    }
    return handleError(error);
  }
};
