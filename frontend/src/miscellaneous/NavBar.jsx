import React, { useState } from "react";
import {
  Container,
  Navbar,
  Image,
  Button,
  Offcanvas,
  Nav,
  Badge,
} from "react-bootstrap";
import "./XCSS.css";

import SideDrawer from "./SlideDrawer";
import ProfileModel from "./ProfileModel";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../context/ChatProvider";
import logo from "../assests/converse.png";

const NavBar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const { user, notification } = ChatState();

  const sideDrawerHandler = () => {
    setShow(!show);
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <React.Fragment>
      <Navbar expand="lg" className="bg-light">
        <Container fluid>
          <Navbar.Brand href="#">
            <Button
              onClick={sideDrawerHandler}
              style={{ width: "300px" }}
              className="shadow-none rounded-pill bg-info text-light fw-bold"
            >
              Search Users &#128269;
            </Button>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="offcanvasNavbar-expand-md"
            className="shadow-none"
          />

          {/* SIDE DRAWER */}
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-md"
            aria-labelledby="offcanvasNavbarLabel-expand-md"
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Image className="w-75" src={logo} />
            </Offcanvas.Header>

            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#" className="px-lg-5">
                  <Button variant="" className="position-relative">
                    <Image
                      className="rounded-circle"
                      height="60px"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfEXkqeoRGfLqlhR5BxhyrdUFbH_aafDUuxA&s"
                    />
                    { notification.length > 0 && <Badge bg="danger" className="position-absolute rounded-pill"> {notification.length}</Badge> }
                  </Button>
                </Nav.Link>
                <Nav.Link href="#">
                  <ProfileModel user={user.data}>
                    <Image
                      className="rounded-circle"
                      height="60px"
                      src={
                        user?.data
                          ? "http://localhost:8000/" + user.data.avatar
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxw0eitGgbS6Y3kJODK5lGbWxUV8sONkQUZg&s"
                      }
                    />
                  </ProfileModel>
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <SideDrawer
        show={show}
        drawerHandler={sideDrawerHandler}
        logoutHandler={logoutHandler}
      />
    </React.Fragment>
  );
};

export default NavBar;
