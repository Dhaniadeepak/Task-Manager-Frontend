import api from "./client";

export const projectApi = {
  getAll: () => api.get("/projects").then((res) => res.data),
  getOne: (id) => api.get(`/projects/${id}`).then((res) => res.data),
  create: (data) => api.post("/projects", data).then((res) => res.data),
};
