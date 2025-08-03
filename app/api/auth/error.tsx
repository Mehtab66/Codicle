import { useRouter } from "next/router";
import { Button } from "../../components/ui/Button";

export default function AuthError() {
  const router = useRouter();
  const { error } = router.query;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-xl text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Authentication Error
        </h1>
        <p className="text-gray-600 mb-6">
          {error
            ? `Error: ${error}`
            : "An unexpected error occurred during authentication."}
        </p>
        <Button
          onClick={() => router.push("/")}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
}
