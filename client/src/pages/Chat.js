import React, { useEffect, useState } from "react";
import io from "socket.io-client";

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
    <div>
      <h1>Chat with a Friend</h1>
      <input onChange={handleJoinRoom} type="text" placeholder="Room Id..." />
      <button onClick={joinRoom}>Join Room</button>
      <input type="text" onChange={handleMessage} placeholder="message" />
      <button onClick={handleSendMessage}>Sent message</button>
      <h1>{recievedMessage}</h1>
    </div>
  );
}

export default Chat;
