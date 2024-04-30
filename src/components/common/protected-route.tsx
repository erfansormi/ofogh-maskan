import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/user-context";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useUserContext();
  if (!user && !loading) {
    return <Navigate to="/auth/login" />;
  }
  return children;
};

export default ProtectedRoute;
