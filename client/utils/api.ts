// authApi.ts
import apiClient, { handleResponse, handleError } from "./apiClient";
import { setToken } from "./session";

interface ApiResponse {
  status: "success" | "error";
  data?: any;
  error?: string;
}

export const createUser = async (
  username: string,
  password: string
): Promise<ApiResponse> => {
  try {
    const response = await apiClient.post("/create_user", {
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
    const response = await apiClient.post("/login", {
      username,
      password,
    });

    const { token } = response.data;

    if (token) {
      setToken(token);
      return handleResponse(response);
    } else {
      return {
        status: "error",
        error: "Unexpected error: No token received.",
      };
    }
  } catch (error: any) {
    if (error.response?.data.error === "User does not exist") {
      return await createUser(username, password);
    }
    return handleError(error);
  }
};

export const postExpense = async (expense: any) => {
  try {
    const response = await apiClient.post("/expenses", expense);
    return handleResponse(response);
  } catch (error) {
    console.error("Error posting expense:", error);
    throw error;
  }
};

export const getExpenses = async () => {
  try {
    const response = await apiClient.get("/expenses");
    return handleResponse(response);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }
};

export const updateExpense = async (transactionData: any, _id: string) => {
  try {
    const response = await apiClient.put(`/expenses/${_id}`, transactionData);
    return handleResponse(response);
  } catch (error) {
    console.error("Error updating expense:", error);
    throw error;
  }
};

export const deleteExpense = async (_id: string): Promise<ApiResponse> => {
  try {
    await apiClient.delete(`/expenses/${_id}`);
    return { status: "success" };
  } catch (error) {
    console.error("Error deleting expense:", error);
    return handleError(error);
  }
};
