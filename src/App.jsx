import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Projects from "./pages/Projects";
import ProjectTasks from "./pages/ProjectTasks";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectTasks />} />
      </Route>

      <Route path="*" element={<Navigate to="/projects" replace />} />
    </Routes>
  );
}
