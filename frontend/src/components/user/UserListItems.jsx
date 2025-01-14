import React from "react";
import { ListGroupItem, Image, Container } from "react-bootstrap";
import "./User.css";

const UserListItems = ({ index, user, onAccess }) => {
  let imageURL = `http://localhost:8000/${user.avatar}`;

  return (
    <ListGroupItem
      as={"li"}
      role='button'
      tabIndex='0'
      id='userchat'
      key={index}
      onClick={()=>{onAccess(user._id)}}
      className="d-flex align-items-center mb-2 border-bottom border-info rounded-pill shadow-lg px-2"
    >
      <Image
        src={imageURL}
        alt={user.avatar}
        className="rounded-circle me-3"
        style={{ width: "50px", height: "50px", objectFit: "cover" }}
      />
      <Container className="p-0" fluid>
        <p className="p-0 m-0 fw-bold text-dark">{user.name}</p>
        <p className="p-0 m-0 fs-small">{user.email}</p>
      </Container>
    </ListGroupItem>
  );
};

export default UserListItems;




