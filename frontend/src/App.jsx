import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import StudentPage from "./pages/StudentPage";
import PublicRoutes from "./routes/publicRoutes/PublicRoutes";
import PrivateRoutes from "./routes/privateRoutes/PrivateRoutes";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { token } = useContext(AuthContext);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={token ? <Home/> : <StudentPage />} />
            <Route element={<PublicRoutes />}>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<PrivateRoutes />}></Route>
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
