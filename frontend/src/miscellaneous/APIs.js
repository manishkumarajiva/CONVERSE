import axios from "axios";
import { URI } from "../constant.js";


const SearchUsers = async (search) => {
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



const CreateGroupChat  = async (group) => {
  const user = JSON.parse(localStorage.getItem('userInfo'));

  const options = {
    headers : {
      "Content-type" : "application/json",
      Authorization : `Bearer ${user.authToken}`
    }
  }

  // need only id's 
  const body = {
    name : group.groupName,
    users: JSON.stringify(group.users.map((user)=>user._id))
  }

  const response = await axios.post(URI+'/chat/group', body, options);
  return response.data;
}


const RenameGroupChat = async (group) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const options = {
    headers : {
      "Content-type" : "application/json",
      Authorization : `Bearer ${user.authToken}`
    }
  }

  const response = await axios.patch(URI+'/chat/renamegroup', group, options);
  return response.data;
}



const AddToGroupChat = async (group) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const options = {
    headers : {
      "Content-type" : "application/json",
      Authorization : `Bearer ${user.authToken}`
    }    
  }

  const response = await axios.put(URI+'/chat/addtogroup', group, options);
  return response.data;
}


const RemoveToGroupChat = async (group) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const options = {
    headers : {
      "Content-type" : "application/json",
      Authorization : `Bearer ${user.authToken}`
    }    
  }

  const response = await axios.put(URI+'/chat/removefromgroup', group, options);
  return response.data;
}



export { SearchUsers, AccessChats, CreateGroupChat, RenameGroupChat, AddToGroupChat, RemoveToGroupChat };
