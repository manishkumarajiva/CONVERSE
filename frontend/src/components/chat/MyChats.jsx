import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { toast } from "react-toastify";
import { FetchUserChats } from "./ChatAPI";
import {
  Container,
  Image,
  Button,
  Stack,
  Badge,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { getRecipent } from "../../config/ChatLogics";
import GroupChatModel from "../../miscellaneous/GroupChatModel";
import ChatLoader from "../../loader/ChatLoader";
import logo from "../../assests/conv.png";
import "./Chat.css";

const chatCSS =
  "d-flex flex-sm-wrap flex-md-nowrap border-5 border-start-0 border-top-0 border-end-0  border-info my-1 overflow-y-hidden rounded ";

const MyChats = ({ fetchAgain }) => {
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
    setLoggedUser(user.data);
    fetchChats();
  }, [fetchAgain]);

  return (
    <React.Fragment>
      <GroupChatModel show={show} handleShow={setShow}></GroupChatModel>
      <Container
        className={` bg-light rounded ${selectedChat ? 'd-sm-none' : 'd-sm-block' } d-md-block`}
        style={{ height: "800px" }}
        fluid
      >
        <Stack direction="vertical">
          <Container
            className="d-flex flex-wrap justify-content-between py-2"
            fluid
          >
            <Image src={logo} style={{ width: "120px" }} />
            <Button
              onClick={chatModelHandler}
              variant="info"
              className="text-light rounded-pill"
            >
              New Group Chat <span className="h5 p-0">&#43;</span>{" "}
            </Button>
          </Container>

          <Container className="mt-5">
            <ListGroup as={"ul"}>
              {chats ? (
                chats.map((chat, index) => {
                  const { name, avatar, email } = getRecipent(
                    loggedUser,
                    chat.users
                  );
                  return (
                    <ListGroupItem
                      as={"li"}
                      key={index}
                      onClick={() => {
                        setSelectedChat(chat);
                      }}
                      className={`${chatCSS}  ${
                        chat._id === selectedChat._id
                          ? "bg-info text-light border-bottom border-dark"
                          : "bg-secondary-subtle"
                      }`}
                    >
                      {!chat.isGroupChat ? (
                        <React.Fragment>
                          <Image src={`http://localhost:8000/${avatar}`} height={'70px'} />
                          <Container>
                            <strong> {name} </strong>
                            <p> {email} </p>
                          </Container>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <Image src={`http://localhost:8000/${chat.groupAdmin.avatar}`} height={'70px'} />
                          <Container>
                            <Button variant="" className="position-relative p-0 fw-bold">
                              {chat.chatName} 
                              <Badge bg="secondary" className='position-absolute top-0 start-100 bg-light text-dark ms-1'> Group </Badge>
                            </Button>
                            <p> {chat.groupAdmin.email} </p>
                          </Container>
                        </React.Fragment>
                      )}
                    </ListGroupItem>
                  );
                })
              ) : (
                <ChatLoader></ChatLoader>
              )}
            </ListGroup>
          </Container>
        </Stack>
      </Container>
    </React.Fragment>
  );
};

export default MyChats;
