import axios from "axios";
import { URI } from "../../constant";

const FetchUserChats = async () => {
  const user = JSON.parse(localStorage.getItem("userInfo"))

  const options = {
    headers: {
      Authorization: `Bearer ${user.authToken}`,
    },
  };

  const response = await axios.get(URI + "/chat", options);
  return response.data;
};




const FetchMessages = async (chatId) => {
  const user = JSON.parse(localStorage.getItem("userInfo"))

  const options = {
    headers: {
      Authorization: `Bearer ${user.authToken}`,
    },
    params: {
      chatId : chatId
    }
  };

  const response = await axios.get(URI + "/message", options);
  return response.data;
};


const SendNewMessage = async (body) => {
  const user = JSON.parse(localStorage.getItem("userInfo"))

  const options = {
    headers: {
      "Content-type" : "application/json",
      Authorization: `Bearer ${user.authToken}`,
    },
  };

  const response = await axios.post(URI + "/message", body, options);
  return response.data;
};


export { FetchUserChats, FetchMessages, SendNewMessage };