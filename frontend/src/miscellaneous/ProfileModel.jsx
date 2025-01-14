import React from "react";
import Modal from "react-bootstrap/Modal";
import { Badge, Container, Image } from "react-bootstrap";
import { ChatState } from "../context/ChatProvider";

const ProfileModel = ({ show, showHandler }) => {
  const { user } = ChatState();

  console.log(user)

  return (
    <React.Fragment>
      <Modal
        size="md"
        show={show}
        onHide={showHandler}
        centered
        animation={true}
      >
        <Modal.Header className="bg-info" closeButton>
          <Modal.Title className="text-white"> PROFILE </Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-0">
          <Container className='p-4 text-center bg-info-subtle' fluid>
            <Image
              src={`${user?.data.avatar ? 'http://localhost:8000/'+user?.data.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXbovM5T4zHTWspWqxX_jKDXXgBH5Asp6Fvg&s'}`}
              roundedCircle
              height="100px"
              width="100px"
              className="border-bottom border-info border-5"
            />

            <h3 className="mb-1"> {user.data.name} </h3>
            <Badge pill bg='secondary'> {user.data.email} </Badge>
            <p>
              {" "}
              Hi i am {user.data.name}, User of CONVERSE since {new Date(user.data.createdAt).toLocaleDateString()}{" "}
            </p>
          </Container>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ProfileModel;
