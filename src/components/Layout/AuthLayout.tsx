import { Navigate, Outlet } from "react-router-dom";
import { useAccess } from "../../hooks/useAccess";

/**
 * A utility based layout for auth related routes such as Register, Login and Forgot Password
 */
export default function Layout() {
  const { isAuthenticated } = useAccess();

  if (isAuthenticated) {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
}
