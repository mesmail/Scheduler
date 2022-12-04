import axios from "axios";
import { baseURL } from "./utils.js";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 20000,
  headers: {
    common: {
      Authorization: localStorage.getItem("token")
        ? "Token " + localStorage.getItem("token")
        : null,
      accept: "application/json",
    },
  },
});

export const setAxiosAuthToken = (token) => {
  if (typeof token !== "undefined" && token) {
    axiosInstance.defaults.headers.common["Authorization"] = "Token " + token;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

export default axiosInstance;
