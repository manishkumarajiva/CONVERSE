import React from "react";
import { Container } from "react-bootstrap";
import { ChatState } from "../../context/ChatProvider";
import SingleChat from "./SingleChat";
import "./Chat.css";

const ChatInbox = ({ fetchAgain, onFetch }) => {
  const { selectedChat } = ChatState();

  return (
    <React.Fragment>
      <Container className={`bg-light p-3 ${selectedChat ? 'd-block' : 'd-none'} d-lg-block rounded`} fluid>
        <SingleChat fetchAgain={fetchAgain} onFetch={onFetch}></SingleChat>
      </Container>
    </React.Fragment>
  );
};

export default ChatInbox;

{
  /* <Container className="text-end" role="button">
            <span className="eye-hover p-2 rounded"> &#128065; </span>{" "}
          </Container> */
}
