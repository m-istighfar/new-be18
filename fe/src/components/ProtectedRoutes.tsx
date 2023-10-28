import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("role");
  const isAuthorized = isLoggedIn && (role === "admin" || role === "user");
  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
