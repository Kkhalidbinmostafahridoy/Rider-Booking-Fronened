import { useLocation, Link } from "react-router";

export function AccountStatusPage() {
  const location = useLocation();
  const status = (location.state as any)?.status || "Unknown";

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 text-center">
      <h1 className="text-3xl font-bold">Account Status: {status}</h1>
      <p>
        Your account is {status}. Please contact support to resolve the issue.
      </p>
      <Link to="/" className="text-blue-500 underline">
        Go Back
      </Link>
    </div>
  );
}
