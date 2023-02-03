import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    const response = await axios.post("/users/register", data);
    console.log("🦩 ~ handleRegister ~ response", response);

    if (response.data.success) navigate("/");
  };

  return (
    <div className=" flex justify-center">
      <div className="flex flex-col justify-center items-center gap-[20px] border-[2px] border-grey h-[500px] w-[500px]">
        <h1>Register</h1>
        <input
          type="username"
          placeholder="Username"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
          className="border-[1px] border-black h-[50px] w-[300px] p-[10px]"
        />
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
          type="submit"
          onClick={handleRegister}
          className="border-[1px] border-black h-[50px] w-[120px]"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
