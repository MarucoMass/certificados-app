import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [alumnos, setAlumnos] = useState([]);
  async function getUser() {
    try {
      const res = await api.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data); 
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      setUser(null);
    }
  }

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser, alumnos, setAlumnos }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
