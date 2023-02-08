import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EmailConfirm() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const response = await axios.post("/users/emailconfirm", { token });
      console.log("🦩 ~ getData ~ response", response);

      if (response.data.status === "success") {
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <p>Thank you!</p>
      <p>Your email is getting verified.</p>
      <p>Very soon you will be redirected to the login page</p>
      <span>Your token is {token}</span>
    </div>
  );
}

export default EmailConfirm;
