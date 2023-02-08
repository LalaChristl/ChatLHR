import "./../styles/Chat.css";
import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import Scroll from "react-scroll-to-bottom";
import Emoji from "../components/InputEmoji";
import { Context } from "../Context";
import ActiveUsers from "../components/ActiveUsers";
import ChatHeader from "../components/ChatHeader";

function Chat() {
  const socket = io.connect("http://localhost:5555");
  // This is coming from the emoji input
  const {
    data,
    text,
    setText,
    userName,
    messageArr,
    setMessageArr,
    setShowChat,
    showChat,
  } = useContext(Context);

  const [room, setRoom] = useState("");

  const handleJoinRoom = (e) => {
    setRoom(e.target.value);
  };

  const joinRoom = () => {
    if (room) {
      socket.emit("join_room", room);
      setShowChat((prev) => !prev);
    }
  };

  const handleSendMessage = async () => {
    await socket.emit("send_message", {
      message: text,
      room: room,
      writer: userName,
      image: data.image,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes() +
        ":" +
        new Date(Date.now()).getSeconds(),
    });

    setText("");
  };

  console.log(messageArr);

  useEffect(() => {
    socket.on("get_message", (data) => {
      setMessageArr((prev) => [...prev, data]);
    });
  }, [socket]);

  return (
    <div className="chat-container">
      {!showChat && (
        <div className="join-room-container">
          <input
            className="room-input"
            onChange={handleJoinRoom}
            type="text"
            placeholder="Room Id..."
            value={room}
          />
          <button className="btn-join-room" onClick={joinRoom}>
            Join Room
          </button>
        </div>
      )}
      {showChat && (
        <>
          <ChatHeader />

          <ActiveUsers />
          <div className="send-message-conatiner">
            <Scroll className="scroll">
              <div className="text-container">
                {messageArr.map((el, i) => {
                  return (
                    <div
                      key={i}
                      className={el.writer === userName ? "me" : "other"}
                    >
                      {el.writer !== userName ? (
                        <span className="writer"> {el.writer} </span>
                      ) : (
                        ""
                      )}

                      <span className="the-text"> {el.message} </span>
                      <img className="user-img" src={el.image} alt="user" />
                    </div>
                  );
                })}
              </div>
            </Scroll>
            <div className="message-input-container">
              <Emoji handleOnEnter={handleSendMessage} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Chat;
