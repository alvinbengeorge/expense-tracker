"use server";
import axios from "axios";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const token = cookies().get("token");
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

export const postExpense = async (expense: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/expenses`, expense, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting expense:", error);
    throw error;
  }
};

export const getExpenses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/expenses`);
    return response.data;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }
};

export const updateExpense = async (expense: any) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/expenses/${expense.id}`,
      expense
    );
    return response.data;
  } catch (error) {
    console.error("Error updating expense:", error);
    throw error;
  }
};

export const deleteExpense = async (id: any) => {
  try {
    await axios.delete(`${API_BASE_URL}/expenses/${id}`);
  } catch (error) {
    console.error("Error deleting expense:", error);
    throw error;
  }
};
