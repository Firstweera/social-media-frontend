import axios from "axios";
import { useMutation } from "react-query";

export const useGetUserProfile = () => {
  return useMutation(async (userId: number) => {
    try {
      const data = {
        userId: userId,
      };

      const response = await axios.post("/user/profile", data, {
        baseURL: import.meta.env.VITE_PUBLIC_BASE_URL,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  });
};

export const useUpdateProfile = (values: { fname: string; lname: string }) => {
  return useMutation(async () => {
    try {
      const data = {
        fname: values?.fname, // optional
        lname: values?.lname, // optional
      };

      const response = await axios.post("/user/updateProfile", data, {
        baseURL: import.meta.env.VITE_PUBLIC_BASE_URL,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  });
};

