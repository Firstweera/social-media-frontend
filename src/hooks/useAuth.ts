import axios from "axios";

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

export async function checkAuthentication(setIsAuthenticated: (arg0: boolean) => void) {
  try {
    const authCheck = await fetchAuthentication();

    if (authCheck) {
      console.log("Successfully authenticated");
      setIsAuthenticated(true);
    } else {
      console.log("Unsuccessfully authenticated");
      setIsAuthenticated(false);
      localStorage.removeItem("token");
    }
  } catch (error) {
    console.error("API error:", error);
    setIsAuthenticated(false);
  }
}
