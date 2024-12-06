import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";;

const PublicRoutes = () => {
  const { token } = useContext(AuthContext);

  return token ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
