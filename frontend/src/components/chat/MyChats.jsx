import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { toast } from "react-toastify";
import { FetchUserChats } from "./ChatAPI";
import { Container, Image, Button, Stack, ListGroup, ListGroupItem } from "react-bootstrap";
import GroupChatModel from "../../miscellaneous/GroupChatModel";
import logo from "../../assests/logo.png";
import "./Chat.css";
import ChatLoader from "../../loader/ChatLoader";

const MyChats = ({}) => {
  const [loggedUser, setLoggedUser] = useState();
  const [show, setShow] = useState(false);
  const { chats, setChats } = ChatState();

  const newChatHandler = () => setShow(!show);

  const fetchChats = async () => {
    try {
      const chats = async () => {
        const response = await FetchUserChats();
        setChats(response);
      };
      chats();
    } catch (error) {
      toast.error("Failed to Load");
      console.log("FETCH CHATS ERROR : ", error.message);
    }
  };


  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('userInfo'));
    setLoggedUser(user);

    fetchChats();
  },[]);

  return (
    <React.Fragment>
      <Container className="bg-light vh-100" fluid>
      <Stack>
        <div className="d-flex justify-content-between">
          <Image src={logo} style={{ width: "80px" }} roundedCircle />
          <Button onClick={newChatHandler} className="text-info fw-bold">
            {" "}
            New Chat <span className="fw-bold h-5">&#43;</span>{" "}
          </Button>
        </div>

        <div>
            <Stack gap={3}>
                <ListGroup as={'ul'}>
                    {
                    //  chats ? (chats.map((chat, index) => {
                    //     return <ListGroupItem as={'li'} key={index}>
                            
                    //     </ListGroupItem>
                    //  })) : (<ChatLoader></ChatLoader>)
                    }
                </ListGroup>
            </Stack>
        </div>
      </Stack>
      </Container>
    </React.Fragment>
  );
};

export default MyChats;
