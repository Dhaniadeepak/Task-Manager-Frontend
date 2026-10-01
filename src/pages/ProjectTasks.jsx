import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import { toast } from "react-toastify";
import { projectApi } from "../api/projectApi";
import { taskApi } from "../api/taskApi";
import { getErrorMessage } from "../api/client";
import { STATUSES } from "../constants";
import Button from "../components/Button";
import Input from "../components/Input";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";

const statusStyle = {
  todo: "bg-gray-100 text-gray-700",
  in_progress: "bg-yellow-100 text-yellow-800",
  done: "bg-green-100 text-green-800",
};

export default function ProjectTasks() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // controlled form
  const [title, setTitle] = useState("");
  const [creating, setCreating] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [proj, taskList] = await Promise.all([
        projectApi.getOne(id),
        taskApi.getByProject(id),
      ]);
      setProject(proj);
      setTasks(taskList);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Task title is required");

    setCreating(true);
    try {
      const task = await taskApi.create(id, { title: title.trim() });
      setTasks((prev) => [...prev, task]);
      setTitle("");
      toast.success("Task added");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setCreating(false);
    }
  };

  const handleStatusChange = async (taskId, status) => {
    setUpdatingId(taskId);
    try {
      const updated = await taskApi.updateStatus(taskId, status);
      setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
      toast.success("Status updated");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <Loader text="Loading tasks..." />;
  if (error) return <ErrorState message={error} onRetry={fetchData} />;

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/projects"
          className="mb-2 inline-flex items-center gap-1 text-sm text-gray-600 hover:text-indigo-600"
        >
          <ArrowLeft size={16} /> Back to projects
        </Link>
        <h1 className="text-xl font-semibold">{project?.name}</h1>
      </div>

      <form onSubmit={handleCreate} className="flex items-start gap-2">
        <div className="flex-1">
          <Input
            name="title"
            placeholder="New task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <Button type="submit" loading={creating}>
          <Plus size={16} /> Add
        </Button>
      </form>

      {tasks.length === 0 && (
        <p className="py-10 text-center text-sm text-gray-500">
          No tasks in this project yet.
        </p>
      )}

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between gap-3 rounded-lg border bg-white p-4"
          >
            <span className={task.status === "done" ? "text-gray-400 line-through" : ""}>
              {task.title}
            </span>

            <select
              value={task.status}
              disabled={updatingId === task.id}
              onChange={(e) => handleStatusChange(task.id, e.target.value)}
              className={`rounded-md px-2 py-1 text-sm font-medium outline-none disabled:opacity-60 ${statusStyle[task.status]}`}
            >
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}
