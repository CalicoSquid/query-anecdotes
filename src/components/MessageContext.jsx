import { createContext, useReducer } from "react";
import PropTypes from 'prop-types';

const messageReducer = (state, action) => {
  switch (action.type) {
    case "ERROR":
      return action.payload;
    case "SUCCESS":
      return action.payload;
    case "RESET":
      return null;
    default:
      return state;
  }
};

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, null);

  return (
    <MessageContext.Provider value={[state, dispatch]}>
      {children}
    </MessageContext.Provider>
  );
};

MessageProvider.propTypes = {
    children: PropTypes.node
  };

export default MessageContext;
