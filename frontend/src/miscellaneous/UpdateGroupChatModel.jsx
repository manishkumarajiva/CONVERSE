import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { ChatState } from "../context/ChatProvider";
import { SearchUsers } from "./APIs";


function UpdateGroupChatModel() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [groupChatName, setGroupChatName] = useState('');

  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  const { user, selectedChat, setSelectedChat } = ChatState();


  // Update's Group Handlers

  const updateGroupNameHandler = async () => {
    if(!groupChatName) return;

    try {
      setRenameLoading(true);
      const payload = {
        chatId: selectedChat._id,
        chatName: groupChatName
      }
      const response = await RenameGroupChat(payload);
      setSelectedChat(response.data);
      setFetchAgain(!fetchAgain)
      setRenameLoading(false)
    } catch (error) {
      toast.error("Failed To Rename");
      console.log("FAILED TO RENAME GROUP ",error.message);
    }
  }
  
  const searchHandler = async (query) => {
    if(!query){
      return;
    }

    try {
      setLoading(true);
      const response = await SearchUsers(query);
      setSearchResult(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed To Search");
      console.log("Failed To Search Users ", error.message);
    }
  }

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
  
  
  return (
    <React.Fragment>

      <Button variant="primary" onClick={handleShow}>
        ADD Group Chat
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Group Name </Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label> Users Id's </Form.Label>
              <Form.Control as="text" />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>

      </Modal>
    </React.Fragment>
  );
}

export default UpdateGroupChatModel;
