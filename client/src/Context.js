import { createContext, useReducer, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const initialState = {
    user: {},
    users: [],
    loading: false,
    hidePopup: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "login":
        return {
          ...state,
          user: { ...action.payload },
        };

      case "loading_image":
        return { ...state, loading: !state.loading };

      case "hide_popup":
        return { ...state, hidePopup: !state.hidePopup };

      default:
        return;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  //Registeration state
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    image:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  });

  // Show or hide the chat page
  const [showChat, setShowChat] = useState(false);

  // State for the emoji input functionality
  const [text, setText] = useState("");

  // State to save the userName
  const [userName, setUserName] = useState("");

  // State for collecting the messages
  const [messageArr, setMessageArr] = useState([]);

  return (
    <Context.Provider
      value={{
        state,
        dispatch,
        data,
        setData,
        text,
        setText,
        userName,
        setUserName,
        messageArr,
        setMessageArr,
        showChat,
        setShowChat,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
