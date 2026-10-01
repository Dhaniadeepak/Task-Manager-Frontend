import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../api/client";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Signup() {
  const { user, signup } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  if (user) return <Navigate to="/projects" replace />;

  const onSubmit = async (data) => {
    try {
      await signup(data);
      toast.success("Account created");
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
        <h1 className="text-xl font-semibold">Create account</h1>

        <Input
          label="Name"
          error={errors.name?.message}
          {...register("name", { required: "Name is required" })}
        />
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
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "At least 6 characters" },
          })}
        />

        <Button type="submit" loading={isSubmitting} className="w-full">
          Sign up
        </Button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
