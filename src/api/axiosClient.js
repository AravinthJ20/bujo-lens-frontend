import axios from "axios";
const Base_URL = process.env.REACT_APP_API_BASE_URL;
const client = axios.create({
  baseURL: `${Base_URL}/api`,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default client;
