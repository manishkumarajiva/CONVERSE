import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import { ChatState } from "../context/ChatProvider";

import { SearchUsers, CreateGroupChat } from "./APIs";

function GroupChatModel({show, handleShow}) {
  const [groupChatName, setGroupChatName] = useState('');
  
  const [search, setSearch] = useState('');
  const [searhResult, setSearchResult] = useState([]);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = ChatState();


  const groupNameHandler = (event) => {
    setGroupChatName(event.target.value);
  }

  const userSearchHandler = async (event) => {
    let query = event.target.value;
    if(!query){ return; }
    setSearch(query);

    try {
      setLoading(true);
      const response = await SearchUsers(search);
      (response) ? setSelectedUsers(response) : setSelectedUsers([]);
      setLoading(false);
    } catch (error) {
      toast.error("Failed To Search");
      console.error("FAILED TO SEARCH - ERROR :: ", error.message);
    }
  }


  const handleAddToGroup = (user) => {
    console.log(user)

    if(selectedUsers.includes(user)){
      toast.warning("User Already Added");
      return;
    }

    setSelectedUsers([...selectedUsers, user]);
  }

  const removeToGroupHandler = (user) => {
    setSelectedUsers(selectedUsers.filter(user => user._id !== user._id));
  }

  // create group
  const handleSubmit = async () => {
    if(!groupChatName && !selectedUsers){
      toast.warning('Please Fill All Fields');
      return;
    }

    try {
      setLoading(true);
      const groupPlayload = {
        groupName: groupChatName,
        users: selectedUsers
      }
      const groupChatResponse = await CreateGroupChat();
      (groupChatResponse) ? setChats([...chats, groupChatResponse]) : setChats([]);
      setLoading(false);
      handleShow();
      toast.success("New Group Created");
    } catch (error) {
      toast.error("Filed To Create Group");
      console.log("FAILED TO CREATE GROUP CHAT :: ", error.message);
    }
  }

  return (
    <React.Fragment>

      <Modal show={show} onHide={handleShow}>

        <Modal.Header className="text-center bg-info text-light" closeButton>
          <Modal.Title> NEW GROUP CHAT </Modal.Title>
        </Modal.Header>

        <Modal.Body className="bg-secondary-subtle">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label> Group Name </Form.Label>
              <Form.Control
                type="text"
                name="groupName"
                value={groupChatName}
                onChange={groupNameHandler}
                placeholder="Enter Group Name"
                className="shadow-none"
              />
            </Form.Group>

            <Form.Group className="mb-3 shadow-none">
              <Form.Label> Group Members </Form.Label>
              <Form.Control 
              type="text" 
              name='search'
              value={search}
              onChange={userSearchHandler}
              placeholder="Search Users"
              className="shadow-none"
            />
            </Form.Group>
          </Form>
          
        </Modal.Body>

        <Modal.Footer className="bg-secondary-subtle">
          <Button variant="danger" onClick={handleShow}>
            Close
          </Button>
          <Button variant="info" onClick={handleShow}>
            Save Changes
          </Button>
        </Modal.Footer>

      </Modal>
    </React.Fragment>
  );
}

export default GroupChatModel;
