import axios from "axios";

export const register = async () => {
  let data = JSON.stringify({
    email: "user4@mail.com",
    password: "P@ssw0rd",
    fname: "Choco",
    lname: "Delight",
  });

  try {
    const response = await axios.post("localhost:3100/register", data, {
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
