import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Attach the token to every request
api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// If the token expires on a protected call, clear the session and go to login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const isAuthCall = err.config?.url?.startsWith("/auth");
    if (err.response?.status === 401 && !isAuthCall) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// One place to turn any error into a readable message
export const getErrorMessage = (err) =>
  err?.response?.data?.message || err?.message || "Something went wrong";

export default api;
