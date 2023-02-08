import "./../styles/ChatHeader.css";
import { useContext } from "react";
import { Context } from "../Context";

function ChatHeader() {
  const { setShowChat } = useContext(Context);

  const handleLeave = () => {
    setShowChat((prev) => !prev);
  };

  return (
    <header className="chat-header">
      <h3 className="slogan">Hangout with friends!</h3>
      <button className="btn-leave-chat" onClick={handleLeave}>
        Leave chat
      </button>
    </header>
  );
}

export default ChatHeader;
