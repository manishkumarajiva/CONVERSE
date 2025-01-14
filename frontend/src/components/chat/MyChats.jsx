import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { toast } from "react-toastify";
import { FetchUserChats } from "./ChatAPI";
import {
  Container,
  Image,
  Button,
  Stack,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { getSender } from "../../config/ChatLogics";
import GroupChatModel from "../../miscellaneous/GroupChatModel";
import ChatLoader from "../../loader/ChatLoader";
import logo from "../../assests/conv.png";
import "./Chat.css";

const chatCSS =
  "border-5 border-start-0 border-top-0 border-end-0  border-info my-1 rounded-pill ";

const MyChats = ({}) => {
  const [loggedUser, setLoggedUser] = useState();
  const [show, setShow] = useState(false);
  const { chats, setChats, selectedChat, setSelectedChat } = ChatState();

  const chatModelHandler = () => setShow(!show);

  const fetchChats = async () => {
    try {
      const UserChats = async () => {
        const response = await FetchUserChats();
        setChats(response.data);
      };
      UserChats();
    } catch (error) {
      toast.error("Failed to Load");
      console.log("FETCH CHATS ERROR : ", error.message);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    setLoggedUser(user);
    fetchChats();
  }, []);

  return (
    <React.Fragment>
      <GroupChatModel show={show} handleShow={setShow}></GroupChatModel>
      <Container className="bg-light vh-100 rounded" fluid>
        <Stack>
          <div className="d-flex justify-content-between p-2">
            <Image src={logo} style={{ width: "120px" }} />
            <Button
              onClick={chatModelHandler}
              variant="info"
              className="text-light rounded-pill px-5"
            >
              New Group Chat <span className="h5 p-0">&#43;</span>{" "}
            </Button>
          </div>

          <div className="mt-5">
            <Stack gap={3}>
              <ListGroup as={"ul"}>
                {chats ? (
                  chats.map((chat, index) => {
                    return (
                      <ListGroupItem
                        as={"li"}
                        key={index}
                        onClick={()=>{setSelectedChat(chat)}}
                        className={`${chatCSS} ${
                          chat._id === selectedChat._id
                            ? "bg-info"
                            : "bg-secondary-subtle"
                        }`}
                      >
                        {!chat.isGroupChat
                          ? getSender(loggedUser, chat.users)
                          : chat.chatName}
                      </ListGroupItem>
                    );
                  })
                ) : (
                  <ChatLoader></ChatLoader>
                )}
              </ListGroup>
            </Stack>
          </div>
        </Stack>
      </Container>
    </React.Fragment>
  );
};

export default MyChats;
