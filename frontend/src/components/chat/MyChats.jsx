import React, { useState, useEffect } from "react";
import { ChatState } from "../../context/ChatProvider";
import { toast } from "react-toastify";
import { AccessChats } from "../../miscellaneous/APIs";


const MyChats = ({}) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async() => {
    try {
        const chats = async () => {
            const response = await AccessChats();
            setChats(response);
        }
        chats();

    } catch (error) {
        toast.error('Failed to Load');
        console.log("FETCH CHATS ERROR : ", error.message);
    }
  }

  return <React.Fragment>

  </React.Fragment>;
};

export default MyChats;
