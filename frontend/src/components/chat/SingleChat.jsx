import React, { useEffect, useState } from "react";
import ProfileModel from "../../miscellaneous/ProfileModel";
import { toast } from "react-toastify";
import { ChatState } from "../../context/ChatProvider";
import { FetchMessages, SendNewMessage } from "./ChatAPI";
import { getRecipent } from "../../config/ChatLogics";
import UpdateGroupChatModel from "../../miscellaneous/UpdateGroupChatModel";
import ScrolableChat from "./ScrolableChat";
import { FormControl, InputGroup, Spinner } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { Container } from "react-bootstrap";
import logo from "../../assests/logo.png";
import "./Chat.css";

// sockets
import { io } from 'socket.io-client'
const ENDPOINT = 'http://localhost:8000/'
var socket, selectedChatCompare;


const SingleChat = ({ fetchAgain, onFetch }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();

  const newMessageHandler = (event) => {
    setNewMessage(event.target.value);
  };

  const fetchMessageHandler = async (e) => {
    if (!selectedChat) return;

    try {
      setLoading(true);
      const response = await FetchMessages(selectedChat._id);
      response ? setMessages(response.data) : setMessages([]);
      setLoading(false);

      socket.emit('join-room', selectedChat._id)
    } catch (error) {
      toast.error("Failed To Fetch");
      console.log("FAILED TO FETCH MESSAGES ", error.messages);
    }
  };

  const sendMessageHandler = async (event) => {
    event.preventDefault();

      try {
        const payload = {
          chatId: selectedChat,
          content: newMessage,
        };
        const response = await SendNewMessage(payload);
        setMessages([...messages, response.data]);
        socket.emit('new-message', response.data)
      } catch (error) {
        toast.error("Failed To Send");
        console.log("FAILED TO SEND MESSAGE ", error.message);
      }
    setNewMessage("")
  };


  const typingHandler = (event) => {
    setNewMessage(event.target.value)

    if(!socketConnected) return;

    if(typing){
      setTyping(true);
      socket.emit('onTyping', selectedChat._id)
    }
  }

  useEffect(()=>{
    if(selectedChat){
      fetchMessageHandler();
    }
    selectedChatCompare = selectedChat;
  },[selectedChat])


 
  useEffect(()=>{
    socket = io(ENDPOINT);
    
    socket.emit('setup', user.data);

    socket.on('connected', function(){
      setSocketConnected(true)
    })

    socket.on('onTyping', function(){
      setTyping(true)
    })
    
    socket.on('offTyping', function(){
      setTyping(false)
    })

  },[selectedChat])


  useEffect(()=>{
    socket.on('message-received', function(newMessageRecieved){

      if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id){
        // notification
      }else{
        setMessages([...messages, newMessageRecieved])
      }
    })
  })


  
  return (
    <React.Fragment>
      {selectedChat ? (
        <Container className="p-0" fluid>
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

            <Container
              className="text-center fs-5 w-100 text-info fw-bold"
              fluid
            >
              {selectedChat.isGroupChat
                ? selectedChat.chatName.toUpperCase()
                : getRecipent(user.data, selectedChat.users).name.toUpperCase()}
            </Container>

            {/* Dialog Models for group of specific chat */}
            <Container className="text-end" fluid> 
              {selectedChat.isGroupChat ? (
                <UpdateGroupChatModel
                  fetchAgain={fetchAgain}
                  onFetch={onFetch}
                ></UpdateGroupChatModel>
              ) : (
                <ProfileModel
                  user={getRecipent(user.data, selectedChat.users)}
                ></ProfileModel>
              )}
            </Container>
          </Container>

          <Container
            className="chat-box p-0"
            fluid
          >
            {loading ? (
              <Spinner
                animation="border"
                variant="info"
                className="mx-auto"
                style={{ height: "6rem", width: "6rem" }}
              ></Spinner>
            ) : (
              <ScrolableChat messages={messages}></ScrolableChat>
            )}
          </Container>

          <InputGroup>
            <FormControl
              type="text"
              onChange={newMessageHandler}
              value={newMessage}
              placeholder="write message"
              className="shadow-none bg-info-subtle p-2 border-2 border-top-0 border-start-0 border-info "
            ></FormControl>
            <InputGroupText onClick={sendMessageHandler} className="bg-info text-white px-4 fw-bold">
              {" "}
              Send ➤{" "}
            </InputGroupText>
          </InputGroup>
          
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
