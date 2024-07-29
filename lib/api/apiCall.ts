import axios, { AxiosInstance, AxiosResponse } from "axios";
import { publicApi, privateApi } from "./axiosInstances";
import { ApiResponse, ErrorResponse } from "../types/apiCommon";

interface ApiCallOptions {
  method: "get" | "post" | "put" | "delete";
  url: string;
  data?: any;
  params?: any;
  isPrivate?: boolean;
  isFormData?: boolean;
}

class ApiError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiCall<T>({
  method,
  url,
  data,
  params,
  isPrivate = false,
  isFormData = false,
}: ApiCallOptions): Promise<T> {
  const api: AxiosInstance = isPrivate ? privateApi : publicApi;

  try {
    const config = {
      method: method,
      url: url,
      data: data,
      params: params,
      headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      },
    };

    const response: AxiosResponse<ApiResponse<T>> = await api(config);

    if (!response.data.success) {
      throw new ApiError(
        response.data.error?.code || "UNKNOWN_ERROR",
        response.data.error?.message || "Unknown error occurred"
      );
    }

    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response?.data as ErrorResponse;
      throw new ApiError(
        errorResponse?.error?.code || "NETWORK_ERROR",
        errorResponse?.error?.message || error.message
      );
    }
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("UNKNOWN_ERROR", "An unexpected error occurred");
  }
}
