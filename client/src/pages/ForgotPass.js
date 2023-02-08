import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPass = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
  });

  const handleSubmit = async () => {
    const response = await axios.post("/users/forgotpass", data);
    console.log("🦩 ~ handleSubmit ~ response", response);

    if (response.data.status === "success")
      alert(
        "We have sent you an email with instructions about how to change your password"
      );
  };

  const handleNavLogin = () => {
    navigate("/");
  };

  return (
    <div>
      <div>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          placeholder="Email"
        />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>

        <p onClick={handleNavLogin}>Login</p>
      </div>
    </div>
  );
};

export default ForgotPass;
