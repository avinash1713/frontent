import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-sbgm.onrender.com/api/v1",
  withCredentials: true,
});

export default api;
