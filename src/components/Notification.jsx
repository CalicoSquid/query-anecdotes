import { useContext } from "react";
import MessageContext from "./MessageContext";

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  const [message, dispatch] = useContext(MessageContext);

  if (message === null) {
    return null;
  }

  return (
    <div style={style}>
      {message === "ERROR" ? (
        <span style={{ color: "red" }}>{message}</span>
      ) : (
        <span style={{ color: "green" }}>{message}</span>
      )}
    </div>
  );
};

export default Notification;
