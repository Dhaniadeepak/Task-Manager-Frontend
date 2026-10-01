import { Link } from "react-router-dom";
import { LogOut, CheckSquare } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <Link to="/projects" className="flex items-center gap-2 font-semibold text-gray-900">
          <CheckSquare size={20} className="text-indigo-600" />
          Task Manager
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">{user?.name}</span>
          <Button variant="secondary" onClick={logout}>
            <LogOut size={16} /> Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
