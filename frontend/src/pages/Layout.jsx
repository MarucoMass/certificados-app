import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
// import { toast } from "react-toastify";

const Layout = () => {
  const navigate = useNavigate();
  const { user, setUser, token, setToken, setAlumnos } = useContext(AuthContext);

  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await api.post("/logout", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // const data = await res.data;
    if (res.status === 200) {
      setUser(null);
      setToken(null);
      setAlumnos([])
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  const navContent = user ? (
    <div className="flex items-center gap-x-4">
      <p className="">Hola {user.name}</p>
      <form onSubmit={handleLogout}>
        <button className="nav-link">Logout</button>
      </form>
    </div>
  ) : (
    <div className="space-x-4">
      <Link to={"/register"} className="nav-link">
        Register
      </Link>
      <Link to={"/login"} className="nav-link">
        Login
      </Link>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="py-6 ">
        <nav className="flex items-center justify-end gap-x-12 pr-8">
          <Link to={"/"} className="nav-link">
            Home
          </Link>
          {navContent}
        </nav>
      </header>

      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
