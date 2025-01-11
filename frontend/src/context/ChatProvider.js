import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();

  // const navigate = useNavigate();

  // useEffect(() => {
  //   const token = JSON.parse(localStorage.getItem('authToken'));
  //   setUser(token);

  //   if (!token) navigate("/");
  // }, [navigate]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};


export const ChatState = () => {
    return useContext(ChatContext);
}

export default ChatProvider