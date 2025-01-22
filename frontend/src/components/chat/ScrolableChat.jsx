import React from "react";
import { ChatState } from "../../context/ChatProvider";
import ScrolableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender } from "../../config/ChatLogics";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Image } from "react-bootstrap";

const ScrolableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <React.Fragment>
      <ScrolableFeed className="p-3">
        {messages.map((message, index) => {
          return (
            <div className="my-3">
              {/* {(isSameSender(messages, message, index, user.data._id) ||
                isLastMessage(messages, index, user.data._id)) && (
                <Link title="Default title" id="avatar">
                  Avatar
                </Link>
              )} */}

              
              <span
                style={{
                  backgroundColor: `${
                    message.sender._id === user.data._id
                      ? "#18dcff"
                      : "#32ff7e"
                  }`,
                  padding: "10px 15px",
                  borderRadius: "20px",
                  color:'white'
                }}
              >
                {message.content}
              </span>
            </div>
          );
        })}
      </ScrolableFeed>
    </React.Fragment>
  );
};

const Link = ({ id, children, title }) => (
  <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
    {children}
  </OverlayTrigger>
);

export default ScrolableChat;
