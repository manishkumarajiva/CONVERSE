import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import { Badge, Button, Container, Image } from "react-bootstrap";

const ProfileModel = ({ user, children }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);


  return (
    <React.Fragment>
      {
        children ? (
          <Button onClick={handleShow} variant="info" className="px-3 w-100 text-white fw-bold"> My Profile {children} </Button>
        ) : (
          <Button onClick={handleShow} variant="" className='text-end'> <span role='button'> 👁 </span> </Button>
        )
      }

      <Modal
        size="md"
        show={show}
        onHide={handleShow}
        centered
        animation={true}
      >
        <Modal.Header className="bg-info" closeButton>
          <Modal.Title className="text-white"> {user?.name.toUpperCase()} </Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-0">
          <Container className='p-4 text-center' fluid>
            <Image
              src={`${user?.avatar ? 'http://localhost:8000/'+user?.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXbovM5T4zHTWspWqxX_jKDXXgBH5Asp6Fvg&s'}`}
              roundedCircle
              height="120px"
              width="120px"
              className="border-bottom border-info border-5"
            />

            <Badge pill bg='info' className="mt-2 py-2 text-center w-50 mx-auto d-block"> {user?.email} </Badge>
            <p>
              {" "}
              Hi i am {user?.name} User of CONVERSE since {new Date(user?.createdAt).toLocaleDateString()}{" "}
            </p>
          </Container>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ProfileModel;
