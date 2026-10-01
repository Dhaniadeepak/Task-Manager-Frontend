import api from "./client";

export const authApi = {
  login: (data) => api.post("/auth/login", data).then((res) => res.data),
  signup: (data) => api.post("/auth/signup", data).then((res) => res.data),
};
