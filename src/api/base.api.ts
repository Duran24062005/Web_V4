import axios from "axios";

export const apiBase = axios.create({
  baseURL: import.meta.env.VITE_URL_BASE_API || "http://localhost:4000",
});
