import React, { useContext } from "react";
import InputEmoji from "react-input-emoji";
import { Context } from "../Context";

function Emoji({ handleOnEnter }) {
  const { text, setText } = useContext(Context);

  return (
    <InputEmoji
      value={text}
      onChange={setText}
      cleanOnEnter
      onEnter={handleOnEnter}
      placeholder="Type a message here..."
    />
  );
}

export default Emoji;
