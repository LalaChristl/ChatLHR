import "./../styles/Loading.css";
import { useContext } from "react";
import { Context } from "../Context";

function Loading() {
  const { state, dispatch } = useContext(Context);
  const { loading } = state;

  const handleContinue = () => {
    dispatch({ type: "hide_popup" });
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <p className="loading-primary">
          {loading ? "Uploading image" : "Image successfully Uploaded!"}
        </p>
        <p className="loading-secondry">
          {loading ? "Content uploading, please wait..." : ""}
        </p>
        {!loading ? (
          <button onClick={handleContinue} className="loading-btn">
            Continue
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Loading;
