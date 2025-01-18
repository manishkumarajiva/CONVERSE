import React, { useState } from "react";
import ProfileModel from "../../miscellaneous/ProfileModel";
import { toast } from "react-toastify";
import { ChatState } from "../../context/ChatProvider";
import { FetchMessages, SendNewMessage } from "./ChatAPI";
import { getRecipent } from "../../config/ChatLogics";
import UpdateGroupChatModel from "../../miscellaneous/UpdateGroupChatModel";
import { Container } from "react-bootstrap";
import logo from "../../assests/logo.png";
import "./Chat.css";

const SingleChat = ({ fetchAgain, onFetch }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();

  const fetchMessageHandler = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);
      const response = await FetchMessages(selectedChat._id);
      response ? setMessages(response.data) : setMessages([]);
      setLoading(false);
    } catch (error) {
      toast.error("Failed To Fetch");
      console.log("FAILED TO FETCH MESSAGES ", error.messages);
    }
  };

  const sendMessageHandler = async (event) => {
    try {
      setNewMessage("");
      const payload = {
        chatId: selectedChat,
        content: newMessage,
      };
      const response = await SendNewMessage(payload);
      setMessages(response.data);
    } catch (error) {
      toast.error("Failed To Send");
      console.log("FAILED TO SEND MESSAGE ", error.message);
    }
  };

  return (
    <React.Fragment>
      {selectedChat ? (
        <Container className="d-flex justify-content-between" fluid>
          <Container variant="" className="d-block d-md-none" fluid>
            <span
              dir="ltr"
              onClick={() => setSelectedChat("")}
              className="bg-info rounded-circle px-1 fs-2 fw-bold text-light"
              role="button"
            >
              {" "}
              &#8672;{" "}
            </span>
          </Container>
          <Container className="text-center fs-5 w-100 text-info fw-bold" fluid>
            {selectedChat.isGroupChat
              ? selectedChat.chatName.toUpperCase()
              : getRecipent(user, selectedChat.users).name.toUpperCase()}
          </Container>

          <Container className="text-end" fluid>
            {selectedChat.isGroupChat ? (
              <UpdateGroupChatModel
                fetchAgain={fetchAgain}
                onFetch={onFetch}
              ></UpdateGroupChatModel>
            ) : (
              <ProfileModel
                user={getRecipent(user, selectedChat.users)}
              ></ProfileModel>
            )}
          </Container>
        </Container>
      ) : (
        <Container
          fluid
          className="d-flex justify-content-center align-items-center"
          style={CHATBOXSTYLE}
        >
          <p className="p-hover display-5"> Click on user to start chat 💬</p>
        </Container>
      )}
    </React.Fragment>
  );
};

export default SingleChat;

const CHATBOXSTYLE = {
  height: "650px",
  backgroundImage: `url(${logo})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  opacity: "0.2",
};
