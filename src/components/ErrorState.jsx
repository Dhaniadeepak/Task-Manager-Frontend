import { AlertCircle } from "lucide-react";
import Button from "./Button";

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="rounded-md border border-red-200 bg-red-50 p-6 text-center">
      <AlertCircle className="mx-auto mb-2 text-red-500" />
      <p className="mb-3 text-sm text-red-700">{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
