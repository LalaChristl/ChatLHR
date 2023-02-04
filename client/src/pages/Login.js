import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../Context";
import { useNavigate } from "react-router-dom";

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
    <div className=" flex justify-center">
      <div className="flex flex-col justify-center items-center gap-[20px] border-[2px] border-grey h-[500px] w-[500px]">
        <h1>Welcome to ChatLHR!</h1>
        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="border-[1px] border-black h-[50px] w-[300px] p-[10px]"
        />
        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          className="border-[1px] border-black h-[50px] w-[300px] p-[10px]"
        />
        <button
          onClick={handleLogin}
          className="border-[1px] border-black h-[50px] w-[120px]"
        >
          Sign in
        </button>

        <p onClick={handleNotUser}>Not a user yet?</p>
      </div>
    </div>
  );
}

export default Login;
