import "../styles/Loading.css";
import "./../styles/Register.css";

import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { Context } from "../Context";
import addPhoto from "../images/add_photo.png";

const Register = () => {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(Context);
  const { hidePopup } = state;

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const { password, confirmPassword } = data;

  const handleRegister = async () => {
    const response = await axios.post("/users/register", data);
    console.log("🦩 ~ handleRegister ~ response", response);

    if (password !== confirmPassword) alert("Passwords do not match");

    if (response.data.status === "success") navigate("/");
  };

  const handleUpload = (img) => {
    if (!img) return;

    dispatch({ type: "loading_image" });
    dispatch({ type: "hide_popup" });

    if (img.type === "image/png" || img.type === "image/jpeg") {
      const data = new FormData();

      data.append("file", img);
      data.append("upload_preset", "chatLHR");
      data.append("cloud_name", "du3mifkli");

      fetch("https://api.cloudinary.com/v1_1/du3mifkli/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Uploaded", data.url);
          setData((prev) => ({ ...prev, image: data.url }));
          dispatch({ type: "loading_image" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleAlreadyUser = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="register-container">
        <h1 className="h1-register">Register</h1>
        <input
          type="username"
          placeholder="Username"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
          className="register-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="register-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          className="register-input"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={data.confirmPassword}
          onChange={(e) =>
            setData({ ...data, confirmPassword: e.target.value })
          }
          className="register-input"
        />

        <label className="label-register">
          Select your profile image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleUpload(e.target.files[0])}
          />
        </label>

        <img className="register-image" src={data.image || addPhoto} alt="" />

        {hidePopup && <Loading />}

        <button
          type="submit"
          onClick={handleRegister}
          className="register-button"
        >
          Register
        </button>

        <p className="p-3" onClick={handleAlreadyUser}>Already a user?</p>
      </div>
    </div>
  );
};

export default Register;
