import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

const setupApi = (ctx: GetServerSidePropsContext | undefined = undefined) => {
  let cookies = parseCookies(ctx);

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies["Phobos.token"]}`,
      Accept: "application/json",
    },
  });
};

const api = setupApi();

export default api;
