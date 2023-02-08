import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ChangePass = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    password: "",
    retypepassword: "",
  });

  const handleSubmit = async () => {
    if (!data.password || data.password !== data.retypepassword)
      return alert("passwords do not match");
    const response = await axios.post("/users/changepass", {
      token,
      password: data.password,
    });
    console.log("🦩 ~ getData ~ response", response);

    if (response.data.status === "success") {
      alert("Password changed successfully");
      navigate("/");
    }
  };

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <div className="body-login">
      <div className="container-login">
        <div className="container-2-login">
          <h1 className="h1-login">Change Password</h1>
          <input
            type="password"
            placeholder="Type your new password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="input-login"
          />
          <input
            type="password"
            placeholder="Re-type your new Password"
            value={data.retypepassword}
            onChange={(e) =>
              setData({ ...data, retypepassword: e.target.value })
            }
            className="input-login"
          />

          <button className="button-login" type="submit" onClick={handleSubmit}>
            Submit
          </button>

          <p className="p-3" onClick={handleLogin}>
            Login
          </p>

          {/* <ToastContainer /> */}
        </div>
      </div>
    </div>
  );
};

export default ChangePass;
