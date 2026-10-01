import api from "./client";

export const taskApi = {
  getByProject: (projectId) =>
    api.get(`/projects/${projectId}/tasks`).then((res) => res.data),
  create: (projectId, data) =>
    api.post(`/projects/${projectId}/tasks`, data).then((res) => res.data),
  updateStatus: (taskId, status) =>
    api.patch(`/tasks/${taskId}`, { status }).then((res) => res.data),
};
