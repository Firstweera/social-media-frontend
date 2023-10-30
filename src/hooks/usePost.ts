import axios from "axios";
import { useMutation, useQuery } from "react-query";

export const useCreatePost = () => {
  return useMutation(async (values: string) => {
    try {
      const data = {
        message: values,
      };

      const response = await axios.post("/post/create", data, {
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

export const useGetPostsFollowing = () => {
  return useQuery("get-all-post-following", fetchPostsFollowing);
};

const fetchPostsFollowing = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_PUBLIC_BASE_URL}/post/getPostFollowing`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const useGetPostsUser = () => {
  return useQuery("get-all-post-user", fetchPostsUser);
};

const fetchPostsUser = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_PUBLIC_BASE_URL}/post/getByUser`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const useUpdatePost = () => {
  return useMutation(async (value: { postId: number; message: string }) => {
    try {
      const data = {
        postId: value?.postId,
        message: value?.message,
      };

      const response = await axios.post("/post/update", data, {
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

export const useDeletePost = () => {
  return useMutation(async (postId: number) => {
    try {
      const data = {
        postId: postId,
      };

      const response = await axios.post("/post/delete", data, {
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

///////////// comment /////////////////

export const useCreateComment = () => {
  return useMutation(async (values: { postId: number; message: string }) => {
    try {
      const data = {
        postId: values?.postId,
        message: values?.message,
      };

      const response = await axios.post("/comment/commentPost", data, {
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

export const useUpdateComment = () => {
  return useMutation(async (values: { commentId: number; message: string }) => {
    try {
      const data = {
        commentId: values?.commentId,
        message: values?.message,
      };

      const response = await axios.post("/comment/updateComment", data, {
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

export const useDeleteComment = () => {
  return useMutation(async (values: { commentId: number }) => {
    try {
      const data = {
        commentId: values?.commentId,
      };

      const response = await axios.post("/comment/deleteComment", data, {
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

////////////// Like post ///////////////

export const useLikePost = () => {
  return useMutation(async (values: { postId: number }) => {
    try {
      const data = {
        postId: values?.postId,
      };

      const response = await axios.post("/like/likePost", data, {
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

export const useUnLikePost = () => {
  return useMutation(async (values: { postId: number }) => {
    try {
      const data = {
        postId: values?.postId,
      };

      const response = await axios.post("/like/unLikePost", data, {
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
