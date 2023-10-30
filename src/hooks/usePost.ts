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

export const useGetPosts = () => {
  return useQuery("get-approver-leave", fetchPosts);
};

const fetchPosts = async () => {
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

// export const useUpdatePost = () => {
//   return useMutation(async () => {
//     try {
//       const data = {
//         postId : 0,
//         message : ""
//       }

//       const response = await axios.post()
//     } catch (error) {
//       throw error
//     }
//   })
// }

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
