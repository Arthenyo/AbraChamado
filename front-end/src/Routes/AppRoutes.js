import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login/login";
import { Recover } from "../pages/Recover/recover";
import { RecoverPassword } from "../pages/Recover/recoverPassword";
import { Home } from "../pages/home/Home";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recover" element={<Recover />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recoverPassword/:token" element={<RecoverPassword />} />
      </Routes>
    </BrowserRouter>
  );
}
