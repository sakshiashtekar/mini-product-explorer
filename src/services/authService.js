import axios from "axios";

export const loginApi = async (username, password) => {
  const response = await axios.post(
    "https://dummyjson.com/auth/login",
    {
      username,
      password,
      expiresInMins: 1440,
    }
  );
  return response.data;
};