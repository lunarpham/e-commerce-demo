import axios from "axios";
import { Constants } from "../lib/constants";

const axiosInstance = axios.create({
  baseURL: Constants.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
