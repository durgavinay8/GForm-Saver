import axios from "axios";
export default axios.create({
  baseURL: "https://gformsaver-api.netlify.app",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: "https://gformsaver-api.netlify.app",
  withCredentials: true,
});
