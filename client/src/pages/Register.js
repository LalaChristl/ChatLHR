import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  const { password, confirmPassword } = data;

  //   const handleUpload = (pics) => {
  //     if (pic === "undefined") {
  //       return;
  //     }

  //     if (pics.type === "image/jpeg" || pics.type === "image/png") {
  //       const data = new FormData();

  //       data.append("file", pics);
  //       data.append("upload_preset", "authentication");
  //       data.append("cloud_name", "du3mifkli");

  //       fetch("https://api.cloudinary.com/v1_1/du3mifkli/image/upload", {
  //         method: "post",
  //         body: data,
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           console.log("Pic succesfully uploaded!", data.url);
  //           setRegisterData((prev) => ({ ...prev, pic: data.url }));
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }
  //   };

  //   const handleUpload = (e) => {
  //     console.log("🦩 ~ handleUpload ~ handleUpload", e.target.files[0]);
  //     if (!e.target.files[0]) return;

  //     const data = new FormData();

  //     data.append("file", e.target.files[0]);
  //     data.append("upload_preset", "chatLHR");
  //     data.append("cloud_name", "dtbrznssn");

  //     fetch("https://api.cloudinary.com/v1_1/dtbrznssn/image/upload", {
  //       method: "post",
  //       body: data,
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("Image is successfully uploaded", data.url);
  //         setData((prev) => ({ ...prev, image: data.url }));
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  //   const handleUpload = async () => {
  //     const response = await axios.post(
  //       "https://api.cloudinary.com/v1_1/dtbrznssn/image/upload"
  //     );
  //     console.log("🦩 ~ handleUpload ~ response", response);
  //   };

  const handleRegister = async () => {
    const response = await axios.post("/users/register", data);
    console.log("🦩 ~ handleRegister ~ response", response);

    if (password !== confirmPassword) alert("Passwords do not match");

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
        <input
          type="password"
          placeholder="Confirm Password"
          value={data.confirmPassword}
          onChange={(e) =>
            setData({ ...data, confirmPassword: e.target.value })
          }
          className="border-[1px] border-black h-[50px] w-[300px] p-[10px]"
        />

        <input type="file" accept="image/*" />

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
