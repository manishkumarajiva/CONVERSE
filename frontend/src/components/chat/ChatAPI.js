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

export { FetchUserChats };