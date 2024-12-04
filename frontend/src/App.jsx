import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import PublicRoutes from "./routes/publicRoutes/PublicRoutes";
import PrivateRoutes from "./routes/privateRoutes/PrivateRoutes";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Layout from "./pages/Layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route element={<PublicRoutes />}>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<PrivateRoutes />}>

            </Route>
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
