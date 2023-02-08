import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../Context";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = () =>
toast('Wrong Email or Password!', {

  autoClose: false,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  });

function Login() {
  const { dispatch, setUserName } = useContext(Context);

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const response = await axios.post("/users/login", data);

      console.log("🦩 ~ handleLogin ~ response", response);

      if (response.data.status === "success") {
        navigate("/chat");
        dispatch({
          type: "login",
          payload: response.data.user,
        });
      } else if (response.data.status === "fail") {
        console.log(":flamingo: ~ handleLogin ~ response", response);
        notify();
      }
    } catch (err) {
      console.log("Err", err);
      if (err.response.status === 401) {
      }
    }
  };

  const handleNotUser = () => {
    navigate("/register");
  };

  return (
    <div className="body-login">
      <div className="container-login">
        <div className="container-2-login">
          <h1 className="h1-login">Welcome to ChatLHR!</h1>
          <input
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="input-login"
          />
          <input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="input-login"
          />
          <p className="p-2">Forgot Password?</p>
          <button className="button-login" onClick={handleLogin}>
            Sign In
          </button>

          <p className="p-3" onClick={handleNotUser}>Not a user yet?</p>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Login;
