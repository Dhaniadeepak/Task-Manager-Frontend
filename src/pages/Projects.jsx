import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FolderKanban, Plus } from "lucide-react";
import { toast } from "react-toastify";
import { projectApi } from "../api/projectApi";
import { getErrorMessage } from "../api/client";
import Button from "../components/Button";
import Input from "../components/Input";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // controlled form
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setProjects(await projectApi.getAll());
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Project name is required");

    setCreating(true);
    try {
      const project = await projectApi.create({ name: name.trim() });
      setProjects((prev) => [...prev, project]);
      setName("");
      toast.success("Project created");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Projects</h1>

      <form onSubmit={handleCreate} className="flex items-start gap-2">
        <div className="flex-1">
          <Input
            name="name"
            placeholder="New project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <Button type="submit" loading={creating}>
          <Plus size={16} /> Add
        </Button>
      </form>

      {loading && <Loader text="Loading projects..." />}
      {error && <ErrorState message={error} onRetry={fetchProjects} />}

      {!loading && !error && projects.length === 0 && (
        <p className="py-10 text-center text-sm text-gray-500">
          No projects yet. Create your first one above.
        </p>
      )}

      <ul className="space-y-2">
        {projects.map((p) => (
          <li key={p.id}>
            <Link
              to={`/projects/${p.id}`}
              className="flex items-center justify-between rounded-lg border bg-white p-4 hover:border-indigo-400"
            >
              <span className="flex items-center gap-2 font-medium">
                <FolderKanban size={18} className="text-indigo-600" />
                {p.name}
              </span>
              <span className="text-sm text-gray-500">{p.taskCount ?? 0} tasks</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
