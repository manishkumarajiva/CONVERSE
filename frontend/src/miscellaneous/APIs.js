import axios from "axios";
import { URI } from "../constant.js";


const FetchAllChats = async (search) => {
  const user = JSON.parse(localStorage.getItem("userInfo"))

  const options = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.authToken}`,
    },
    params: {
      search: search,
    },
  };

  const response = await axios.get(URI + `/user`, options);
  return response.data;
};


const AccessChats = async (userId) => {
  const user = JSON.parse(localStorage.getItem("userInfo"))

  const options = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.authToken}`,
    },

    params: {
      userId: userId,
    }
  };
  const response = await axios.post(URI + "/chat", {}, options);
  return response.data;
};

export { FetchAllChats, AccessChats };
