import React from "react";
import { ChatState } from "../../context/ChatProvider";
import ScrolableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from "../../config/ChatLogics";
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
            <div className="my-3" key={index}>
                     
              <p className="text-wrap text-break d-inline-block"
                style={{
                  backgroundColor: `${
                    message.sender._id === user.data._id
                      ? "#18dcff"
                      : "#32ff7e"
                  }`,
                  marginLeft:`${isSameSenderMargin(messages, message, index, user.data._id)}%`,  
                  marginTop: `${isSameUser(messages, message, index) ? 3 : 10}px`,
                  padding: "10px 15px",
                  borderRadius: "20px",
                  color:'white'
                }}
              >
                {message.content}
              </p>
            </div>
          );
        })}
      </ScrolableFeed>
    </React.Fragment>
  );
};


export default ScrolableChat;
