import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const PrivateRoutes = () => {
  const { token } = useContext(AuthContext);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
