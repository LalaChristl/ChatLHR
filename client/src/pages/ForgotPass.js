import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ForgotPass.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = () =>
  toast.info(
    "We have sent you an email with instructions about how to change your password",
    {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    }
  );

const ForgotPass = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
  });

  const handleSubmit = async () => {
    const response = await axios.post("/users/forgotpass", data);
    console.log("🦩 ~ handleSubmit ~ response", response);

    if (response.data.status === "success") notify();
  };

  const handleNavLogin = () => {
    navigate("/");
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <p>Please enter you email</p>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          placeholder="Email"
          className="forgot-input"
        />
        <button className="forgot-button" type="submit" onClick={handleSubmit}>
          Submit
        </button>

        <p className="forgot-p" onClick={handleNavLogin}>
          Login
        </p>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ForgotPass;
