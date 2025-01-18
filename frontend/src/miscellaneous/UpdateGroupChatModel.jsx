import React from "react";
import { useState } from "react";
import {
  Form,
  Button,
  Modal,
  ListGroup,
  FormText,
  Stack,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { ChatState } from "../context/ChatProvider";

import { SearchUsers, RenameGroupChat, AddToGroupChat, RemoveToGroupChat } from "./APIs";
import { User, UserBadge } from "../common/GroupModelHelper";

function UpdateGroupChatModel({ fetchAgain, onFetch }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const [groupChatName, setGroupChatName] = useState("");

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  const { user, selectedChat, setSelectedChat } = ChatState();

  // Update's Group Handlers

  const updateGroupHandler = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const payload = {
        chatId: selectedChat._id,
        chatName: groupChatName,
      };
      const response = await RenameGroupChat(payload);
      setSelectedChat(response.data);
      onFetch(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast.error("Failed To Rename");
      console.log("FAILED TO RENAME GROUP ", error.message);
    }
    setGroupChatName("");
  };

  const userSearchHandler = async (event) => {
    let query = event.target.value;
    if (!query) {
      setSearch("");
      setSearchResult([]);
      return;
    }

    setSearch(query);

    try {
      setLoading(true);
      const response = await SearchUsers(query);
      setSearchResult(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed To Search");
      console.log("Failed To Search Users ", error.message);
    }
  };

  const handleAddToGroup = async (newUser) => {

    if(selectedChat.users.find((user) => user._id === newUser._id)){
      toast.info('User Already In Group');
      return;
    }

    if(selectedChat.groupAdmin._id !== user.id){
      toast.warning("Only Admin Can Add Someone");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        chatId: selectedChat._id,
        userId: newUser._id
      }
      const response = await AddToGroupChat(payload);
      setSelectedChat(response.data);
      onFetch(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast.error("Failed To Add");
      console.log("FAILED TO ADD IN GROUP ", error.message);
    }
  setGroupChatName('');
  };

  const removeToGroupHandler = async (ruser) => {
    if(
      selectedChat.groupAdmin._id !== user._id && 
      ruser._id !== user._id
    ){
      toast.warning("Only Admin Can Remove");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        chatId: selectedChat._id,
        userId: ruser._id
      }
      const response = await RemoveToGroupChat(payload);
      ruser._id === user._id ? setSelectedChat() : setSelectedChat(response.data);
      onFetch(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast.error("Failed To Remove");
      console.log("FAILED TO REMOVE FROM GROUP ", error.message);
    }

    setGroupChatName('');
  };

  return (
    <React.Fragment>
      <Button onClick={handleShow} variant="" className="text-end">
        👁
      </Button>

      <Modal show={show} onHide={handleShow}>
        <Modal.Header className="text-center bg-info text-light" closeButton>
          <Modal.Title>
            {" "}
            {groupChatName ? groupChatName.toUpperCase() : "UPDATE GROUP"}{" "}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="bg-secondary-subtle">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label> Group Name </Form.Label>
              <Form.Control
                type="text"
                name="groupName"
                value={groupChatName}
                onChange={(e) => {
                  setGroupChatName(e.target.value);
                }}
                placeholder="Enter Group Name"
                className="shadow-none"
              />
            </Form.Group>

            <Form.Group className="mb-3 shadow-none">
              <Form.Label> Group Members </Form.Label>
              <Form.Control
                type="text"
                name="search"
                value={search}
                onChange={userSearchHandler}
                placeholder="Search Users"
                className="shadow-none"
              />
            </Form.Group>
            {loading ? (
              <FormText className="text-primary"> Loading... </FormText>
            ) : (
              <Stack
                direction="horizontal"
                gap={2}
                className="d-flex flex-wrap"
              >
                {selectedChat.users.map((user, index) => (
                  <UserBadge
                    user={user}
                    onRemove={removeToGroupHandler}
                  ></UserBadge>
                ))}
              </Stack>
            )}
          </Form>

          <ListGroup as={"ul"} className="border-0">
            {searchResult.map((user) => (
              <User user={user} onAddToCart={handleAddToGroup}></User>
            ))}
          </ListGroup>
        </Modal.Body>

        <Modal.Footer className="bg-secondary-subtle">
          <Button
            variant="info"
            onClick={updateGroupHandler}
            className="w-100 text-light fw-bold"
          >
            New Chat Group
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default UpdateGroupChatModel;
