// api.ts
import { BASE_URL } from "@/modules/base-url";
import axios from "axios";

export const api = axios.create({
  baseURL: BASE_URL,
});

export const getReq = async (path: string, params?: Record<string, any>) => {
  try {
    const result = await api.get(`${BASE_URL}${path}`, {
      params,
      withCredentials: true,
    });

    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = {
        status: error.response?.status,
        message: error.response?.data,
      };

      throw err;
    }
    throw error;
  }
};

export const postReq = async (path: string, body: Record<string, any>) => {
  try {
    const result = await api.post(
      `${BASE_URL}${path}`,
      { ...body },
      {
        withCredentials: true,
      },
    );

    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = {
        status: error.response?.status,
        message: error.response?.data,
      };

      throw err;
    }
    throw error;
  }
};
