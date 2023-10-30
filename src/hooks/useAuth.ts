import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../App";

export const fetchAuthentication = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_PUBLIC_BASE_URL}/authentication`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const checkAuthentication = async () => {
  const { setIsAuthen } = useContext(AuthContext);

  try {
    const authCheck = await fetchAuthentication();

    if (authCheck) {
      console.log("Successfully authenticated");
      setIsAuthen(true);
    } else {
      console.log("Unsuccessfully authenticated");
      setIsAuthen(false);
      localStorage.removeItem("token");
    }
  } catch (error) {
    console.error("API error:", error);
    setIsAuthen(false);
  }
};
