import { useMutation } from "react-query";
import axios from "axios";
import { ILoginData, IRegister } from "../interfaces";

// Create a reusable login mutation
export const useSignIn = () => {
  return useMutation(async (values: ILoginData) => {
    const data = {
      email: values?.email,
      password: values?.password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_PUBLIC_BASE_URL}/login`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  });
};

export const useSignUp = () => {
  return useMutation(async (values: IRegister) => {
    const data = {
      fname: values?.firstName,
      lname: values?.lastName,
      email: values?.email,
      password: values?.password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_PUBLIC_BASE_URL}/register`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response; 
  });
};
