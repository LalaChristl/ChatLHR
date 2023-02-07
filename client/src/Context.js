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

  // State for the emoji input functionality
  const [text, setText] = useState("");

  // State to save the userName

  const [userName, setUserName] = useState("");

  return (
    <Context.Provider
      value={{
        state,
        dispatch,
        text,
        setText,
        userName,
        setUserName,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
