import axios from "axios";

interface ICheckAuth {
  setUser: (newUser: {
    isAuthen: boolean;
    profileMode: { mode: string; userId: any };
  }) => void; // Use "void" instead of an empty function
}

export const checkAuthentication = async ({ setUser }: ICheckAuth) => {
  const userInfoString = localStorage.getItem("userInfo");
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

  try {
    const authCheck = await fetchAuthentication();

    if (authCheck) {
      console.log("Successfully authenticated");
      setUser({
        isAuthen: true,
        profileMode: {
          mode: "myProfile",
          userId: userInfo?.userId,
        },
      });
    } else {
      console.log("Unsuccessfully authenticated");
      setUser({
        isAuthen: false,
        profileMode: {
          mode: "myProfile",
          userId: userInfo?.userId,
        },
      });
      localStorage.removeItem("token");
    }
  } catch (error) {
    console.error("API error:", error);
    setUser({
      isAuthen: false,
      profileMode: {
        mode: "myProfile",
        userId: userInfo?.userId,
      },
    });
  }
};

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
