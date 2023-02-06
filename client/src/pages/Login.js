import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../Context";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const { state, dispatch } = useContext(Context);

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await axios.post("/users/login", data);
    console.log("🦩 ~ handleLogin ~ response", response);

    if (response.data.success) {
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

  console.log("~ Login ~ state", state);
  return (
    <div className="container">
      <div className="container-2">
        <h1>Welcome to ChatLHR!</h1>
        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
         <p className="p-2">Forgot Passowrd</p>
        <button onClick={handleLogin}>Sign In</button>

        <p onClick={handleNotUser}>Not a user yet?</p>

       
      </div>
    </div>
  );
}

export default Login;
