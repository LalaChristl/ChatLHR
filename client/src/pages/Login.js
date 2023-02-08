import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../Context";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

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
        setUserName(response.data.newUser.username);
      } else if (response.data.status === "fail") {
        console.log(":flamingo: ~ handleLogin ~ response", response);
        alert("Wrong email or password");
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

  const handleForgotPass = () => {
    navigate("/forgotpass");
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
          <p className="p-2" onClick={handleForgotPass}>
            Forgot Password?
          </p>
          <button className="button-login" onClick={handleLogin}>
            Sign In
          </button>

          <p onClick={handleNotUser}>Not a user yet?</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
