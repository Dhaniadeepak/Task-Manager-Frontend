import { Loader2 } from "lucide-react";

const variants = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700",
  secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50",
};

export default function Button({
  children,
  variant = "primary",
  loading = false,
  className = "",
  ...props
}) {
  return (
    <button
      disabled={loading || props.disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
}
