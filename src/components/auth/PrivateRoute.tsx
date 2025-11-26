import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated || !user) {
    return <Navigate to="/signin" replace />;
  }

  if (user.role !== "ADMIN") {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default PrivateRoute;
