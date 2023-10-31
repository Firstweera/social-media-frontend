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

export const useUpdateProfile = () => {
  return useMutation(async (values: { fname: string; lname: string }) => {
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

      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const useFollowUser = () => {
  return useMutation(async (values: { friendId: number }) => {
    try {
      const data = {
        friendId: values?.friendId,
      };

      const response = await axios.post("/user/follow", data, {
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

export const useUnFollowUser = () => {
  return useMutation(async (values: { friendId: number }) => {
    try {
      const data = {
        friendId: values?.friendId,
      };

      const response = await axios.post("/user/unfollow", data, {
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
