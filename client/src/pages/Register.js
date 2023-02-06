import "../styles/Loading.css";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { Context } from "../Context";

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

    if (response.data.success) navigate("/");
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

  return (
    <div className="flex justify-center">
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={data.confirmPassword}
          onChange={(e) =>
            setData({ ...data, confirmPassword: e.target.value })
          }
          className="border-[1px] border-black h-[50px] w-[300px] p-[10px]"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleUpload(e.target.files[0])}
        />

        {hidePopup && <Loading />}

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
