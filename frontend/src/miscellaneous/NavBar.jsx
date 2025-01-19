// import React, { useState } from "react";
// import { Container, Navbar, Dropdown, Image, Button } from "react-bootstrap";
// import "./XCSS.css";

// import SideDrawer from "./SlideDrawer";
// import ProfileModel from "./ProfileModel";
// import { useNavigate } from "react-router-dom";
// import { user } from "../context/ChatProvider";

// const NavBar = () => {
//   const [show, setShow] = useState(false);
//   const [profileModel, setProfileModel] = useState(false);
//   const navigate = useNavigate();

//   const sideDrawerHandler = () => {
//     setShow(!show);
//   };

//   const profileModelHandler = () => {
//     setProfileModel(!profileModel);
//   };

//   const logoutHandler = () => {
//     localStorage.removeItem("userInfo");
//     navigate("/");
//   };

//   return (
//     <Navbar expand="md" className="bg-light">
//       <SideDrawer show={show} drawerHandler={sideDrawerHandler} />
//       <ProfileModel show={profileModel} showHandler={profileModelHandler} />

//       <Container className="p-0 d-flex justify-content-between" fluid>
//         <Container fluid>
//           <Button
//             onClick={sideDrawerHandler}
//             style={{ width: "300px" }}
//             className="shadow-none rounded-pill bg-info disable text-center text-light fw-bold"
//           >
//             Search Users &#128269;
//           </Button>
//         </Container>

//         <Container className="d-flex justify-content-between">
//           <Container className="d-flex justify-content-end">
//             <Image
//               className="rounded-circle"
//               height="60px"
//               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfEXkqeoRGfLqlhR5BxhyrdUFbH_aafDUuxA&s"
//             />
//           </Container>

//           <Container className="d-flex justify-content-center">
//             <Dropdown>
//               <Dropdown.Toggle
//                 className="bg-transparent border-0"
//                 id="dropdown-basic"
//               >
//                 <Image
//                   className="rounded-circle"
//                   height="60px"
//                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxw0eitGgbS6Y3kJODK5lGbWxUV8sONkQUZg&s"
//                 />
//               </Dropdown.Toggle>

//               <Dropdown.Menu>
//                 <Dropdown.Item onClick={profileModelHandler}>
//                   My Profile
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </Container>
//         </Container>
//       </Container>

//       {/* Collapse toggle */}
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//       <Navbar.Collapse id="basic-navbar-nav">
//         {/* Add the content you want to collapse here */}
//       </Navbar.Collapse>
//     </Navbar>
//   );
// };

// export default NavBar;

import React, { useState } from "react";
import {
  Container,
  Navbar,
  Image,
  Button,
  Offcanvas
} from "react-bootstrap";
import "./XCSS.css";

import SideDrawer from "./SlideDrawer";
import ProfileModel from "./ProfileModel";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../context/ChatProvider";

const NavBar = () => {
  const [show, setShow] = useState(false);
  const [offcanvasShow, setOffcanvasShow] = useState(false);
  const navigate = useNavigate();

  const { user } = ChatState();

  const sideDrawerHandler = () => {
    setShow(!show);
  };


  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <React.Fragment>
      <Navbar expand="md" className="bg-light d-flex">
        <Container fluid className="px-3 py-2 d-flex justify-content-between">
          <Button
            onClick={sideDrawerHandler}
            style={{ width: "300px" }}
            className="shadow-none rounded-pill bg-info text-light fw-bold"
          >
            Search Users &#128269;
          </Button>

          <Navbar.Toggle
            aria-controls="offcanvasNavbar"
            onClick={() => setOffcanvasShow(true)}
            className="shadow-none"
          />
        </Container>

        <Offcanvas
          show={offcanvasShow}
          onHide={() => setOffcanvasShow(false)}
          placement="start"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Container>

              <ProfileModel user={user}>
                <Image
                  className="rounded-circle"
                  height="60px"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxw0eitGgbS6Y3kJODK5lGbWxUV8sONkQUZg&s"
                />
              </ProfileModel>

              <Container className="bg-danger-subtle mt-3 py-2 rounded">
                <Image
                  className="rounded-circle"
                  height="60px"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfEXkqeoRGfLqlhR5BxhyrdUFbH_aafDUuxA&s"
                />
              </Container>
            </Container>
          </Offcanvas.Body>
        </Offcanvas>
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
