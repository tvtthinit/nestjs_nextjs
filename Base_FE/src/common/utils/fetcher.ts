import axios from "axios";

const api = axios.create({
  baseURL: "/api",        // 👈 ensures requests go to /api/users/:id
  withCredentials: true,  // 👈 if you rely on cookies
});

export default api;