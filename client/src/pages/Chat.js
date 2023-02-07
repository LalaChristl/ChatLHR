import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "../styles/Chat.css";

const socket = io.connect("http://localhost:5555");

function Chat() {
  const [message, setMessage] = useState("");
  const [recievedMessage, setRecievedMessage] = useState("");
  const [room, setRoom] = useState("");

  console.log(message);

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    socket.emit("send_message", {
      message: message,
      room: room,
    });
  };

  useEffect(() => {
    socket.on("get_message", (data) => {
      setRecievedMessage(data.message);
    });
  }, [socket]);

  const handleJoinRoom = (e) => {
    setRoom(e.target.value);
  };
  console.log(room);

  const joinRoom = () => {
    if (room) {
      socket.emit("join_room", room);
    }
  };

  return (
    <div className="chat-container1"> 
    <div className="chat-container2">
      <h1 className="chat-title">Chat with a Friend</h1>
      <input className="join-room-input" onChange={handleJoinRoom} type="text" placeholder="Room Id..." />
      <button className="join-room-button" onClick={joinRoom}>Join Room</button>
      <input className="message-input" type="text" onChange={handleMessage} placeholder="message" />
      <button className="send-message-button" onClick={handleSendMessage}>Sent message</button>
      <h1 className="h1-message">{recievedMessage}</h1>
    </div>
    </div>
  );
}

export default Chat;
