import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";
import { toast } from "react-toastify";
import { ChatState } from "../context/ChatProvider";

import { SearchUsers, CreateGroupChat } from "./APIs";
import { User, UserBadge } from "../common/GroupModelHelper";
import { FormText, ListGroup } from "react-bootstrap";

function GroupChatModel({ show, handleShow }) {
  const [groupChatName, setGroupChatName] = useState("");

  const [search, setSearch] = useState();
  const [searhResult, setSearchResult] = useState([]);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { chats, setChats } = ChatState();

  const groupNameHandler = (event) => {
    setGroupChatName(event.target.value);
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
      response ? setSearchResult(response.data) : setSearchResult([]);
      setLoading(false);
    } catch (error) {
      toast.error("Failed To Search");
      console.error("FAILED TO SEARCH - ERROR :: ", error.message);
    }
  };

  const handleAddToGroup = (user) => {
    if (selectedUsers.includes(user)) {
      toast.warning("User Already Added");
      return;
    }
    setSelectedUsers([...selectedUsers, user]);
  };

  const removeToGroupHandler = (ruser) => {
    setSelectedUsers(selectedUsers.filter((user) => user._id !== ruser._id));
  };

  // create group
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!groupChatName && !selectedUsers.length) {
      toast.warning("Please Fill All Fields");
      return;
    }

    try {
      setLoading(true);
      const groupPlayload = {
        groupName: groupChatName,
        users: selectedUsers,
      };
      const groupChatResponse = await CreateGroupChat(groupPlayload);
      groupChatResponse
        ? setChats([...chats, groupChatResponse.data])
        : setChats([]);
      setLoading(false);
      setGroupChatName("");
      setSelectedUsers([]);
      handleShow();
      toast.success("New Group Created");
    } catch (error) {
      toast.error("Filed To Create Group");
      console.log("FAILED TO CREATE GROUP CHAT :: ", error.message);
    }
  };

  return (
    <React.Fragment>
      <Modal show={show} onHide={handleShow}>
        <Modal.Header className="text-center bg-info text-light" closeButton>
          <Modal.Title>
            {" "}
            {groupChatName ? groupChatName.toLocaleUpperCase() : "NEW CHAT GROUP"}{" "}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
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
                {selectedUsers.map((user, index) => (
                  <UserBadge
                    user={user}
                    onRemove={removeToGroupHandler}
                  ></UserBadge>
                ))}
              </Stack>
            )}
          </Form>

          <ListGroup as={"ul"}>
            {searhResult.map((user) => (
              <User user={user} onAddToCart={handleAddToGroup}></User>
            ))}
          </ListGroup>
        </Modal.Body>

        <Modal.Footer className="bg-info-subtle">
          <Button
            variant="info"
            onClick={handleSubmit}
            className="w-100 text-light fw-bold"
          >
            New Chat Group
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default GroupChatModel;
