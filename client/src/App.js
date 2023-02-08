import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";

import Login from "./pages/Login";
import Register from "./pages/Register";
import EmailConfirm from "./pages/EmailConfirm";
import ForgotPass from "./pages/ForgotPass";
import ChangePass from "./pages/ChangePass";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/emailconfirm/:token" element={<EmailConfirm />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
        <Route path="/changepass/:token" element={<ChangePass />} />

        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
