import "./../styles/ChatHeader.css";

function ChatHeader() {
  return (
    <header className="chat-header">
      <h3 className="slogan">Hangout with friends!</h3>
      <button className="btn-leave-chat">Leave chat</button>
    </header>
  );
}

export default ChatHeader;
