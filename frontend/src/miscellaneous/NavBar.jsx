import React, { useState } from "react";
import {
  Container,
  Navbar,
  Dropdown,
  Image,
  Button,
} from "react-bootstrap";
import "./XCSS.css";

import SideDrawer from "./SlideDrawer";
import ProfileModel from "./ProfileModel";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [show, setShow] = useState(false);
  const [profileModel, setProfileModel] = useState(false);
  const navigate = useNavigate();

  const sideDrawerHandler = () => {
    setShow(!show);
  };

  const profileModelHandler = () => {
    setProfileModel(!profileModel);
  };

  const logoutHandler = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-light">
      <SideDrawer show={show} drawerHandler={sideDrawerHandler}></SideDrawer>
      <ProfileModel
        show={profileModel}
        showHandler={profileModelHandler}
      ></ProfileModel>
      <Container className="p-0 d-flex justify-content-between" fluid>
        <Container fluid>
          <Button
            onClick={sideDrawerHandler}
            style={{ width: "300px" }}
            className="shadow-none rounded-pill bg-info disable text-center text-light fw-bold"
          >
            Search Users &#128269;
          </Button>
        </Container>

        <Container className="d-flex justify-content-between">
          <Container className="d-flex justify-content-end">
            <Image
              className="rounded-circle"
              height="60px"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfEXkqeoRGfLqlhR5BxhyrdUFbH_aafDUuxA&s"
            />
          </Container>

          <Container className="d-flex justify-content-center">
            <Dropdown>
              <Dropdown.Toggle
                className="bg-transparent border-0"
                id="dropdown-basic"
              >
                <Image
                  className="rounded-circle"
                  height="60px"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxw0eitGgbS6Y3kJODK5lGbWxUV8sONkQUZg&s"
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={profileModelHandler}>
                  My Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </Container>
      </Container>
    </Navbar>
  );
};

export default NavBar;
