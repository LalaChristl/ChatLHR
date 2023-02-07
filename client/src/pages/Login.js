import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../Context";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const { state, dispatch, setUserName } = useContext(Context);

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await axios.post("/users/login", data);
    console.log("🦩 ~ handleLogin ~ response", response);

    if (response.data.newUser.username) {
      setUserName(response.data.newUser.username);
    }

    if (response.data.status === "Success") {
      navigate("/chat");
      dispatch({
        type: "login",
        payload: response.data.user,
      });
    } else {
      if (response.data.errorID === 1) alert("Wrong email or password");
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

        <p onClick={handleNotUser}>Not a user yet?</p>
      </div>
    </div>
    </div>
  );
}

export default Login;
