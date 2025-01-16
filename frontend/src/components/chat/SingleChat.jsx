import React, { useState, useEffect } from 'react';
import ProfileModel from '../../miscellaneous/ProfileModel';
import { toast } from 'react-toastify';
import { ChatState } from '../../context/ChatProvider';
import { FetchMessages, SendNewMessage } from './ChatAPI';
import { getRecipent, getSender } from '../../config/ChatLogics';
import { Container, Button } from 'react-bootstrap';
import logo from '../../assests/logo.png';
import "./Chat.css";

const SingleChat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const [loading, setLoading] = useState(false);

    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const { user, selectedChat, setSelectedChat, notification, setNotification } = ChatState();


    const fetchMessageHandler = async () => {
        if(!selectedChat) return;

        try {
            setLoading(true);
            const response = await FetchMessages(selectedChat._id);
            (response) ? setMessages(response.data) : setMessages([]);
            setLoading(false);
        } catch (error) {
            toast.error("Failed To Fetch");
            console.log("FAILED TO FETCH MESSAGES ", error.messages);
        }
    }


    const sendMessageHandler = async (event) => {
        try {
            setNewMessage('');
            const payload = {
                chatId : selectedChat,
                content : newMessage
            }
            const response = await SendNewMessage(payload);
            setMessages(response.data);
        } catch (error) {
            toast.error("Failed To Send");
            console.log("FAILED TO SEND MESSAGE ", error.message);
        }
    }



  return <React.Fragment>
    { selectedChat ? (
        <Container className='d-flex justify-content-between'>
            <Container variant='' className='d-block'> 
                <span onClick={()=>setSelectedChat('')} className='bg-secondary-subtle p-2 rounded' role='button'> ⬅ </span> 
            </Container>
            <Container className='text-center fs-5'> 
                {
                    selectedChat.isGroupChat ? (selectedChat.chatName.toUpperCase()) : (getRecipent(user, selectedChat.users).toUpperCase())
                }
            </Container>
            <Container className='text-end'> <span role='button'> 👁 </span> </Container>
        </Container>
     ) : 
        <Container className='d-flex justify-content-center align-items-center' style={CHATBOXSTYLE}>
            <p className='p-hover display-5'> Click on user to start chat 💬.</p>
        </Container>
         }
  </React.Fragment>
}

export default SingleChat







const CHATBOXSTYLE = { 
    height:'650px', 
    backgroundImage:`url(${logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    opacity:'0.2'
 }