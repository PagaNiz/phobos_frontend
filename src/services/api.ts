import axios from "axios";

const setupApi = () => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
      //   Authorization: "Bearer " + process.env.API_KEY,
      Accept: "application/json",
    },
  });
};

const api = setupApi();

export default api;
