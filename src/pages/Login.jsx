import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../api/client";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  if (user) return <Navigate to="/projects" replace />;

  const onSubmit = async (data) => {
    try {
      await login(data);
      toast.success("Welcome back!");
      navigate("/projects");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-4 rounded-lg bg-white p-6 shadow"
      >
        <h1 className="text-xl font-semibold">Log in</h1>

        <Input
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register("email", { required: "Email is required" })}
        />
        <Input
          label="Password"
          type="password"
          error={errors.password?.message}
          {...register("password", { required: "Password is required" })}
        />

        <Button type="submit" loading={isSubmitting} className="w-full">
          Log in
        </Button>

        <p className="text-center text-sm text-gray-600">
          No account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
