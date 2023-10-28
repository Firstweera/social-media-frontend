import axios from "axios";
import { ILoginData } from "../interfaces";

export const login = async (values: ILoginData) => {
  let data = {
    email: values?.email,
    password: values?.password,
  };

  try {
    const response = await axios.post("localhost:3100/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // console.log(JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
