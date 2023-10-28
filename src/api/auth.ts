import axios from "axios";

export const authentication = async () => {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "localhost:3100/authentication",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
