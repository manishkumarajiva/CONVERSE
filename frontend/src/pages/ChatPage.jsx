import React from "react";
import NavBar from "../miscellaneous/NavBar";
import MyChats from "../components/chat/MyChats";
import { Container, Row, Col } from "react-bootstrap";
import ChatInbox from "../components/chat/ChatInbox";

const ChatPage = () => {
  return (
    <React.Fragment>
      <NavBar></NavBar>
      <Container className="py-2 mt-2" fluid>
        <Row>
          <Col xs={12} md={5}>
            <MyChats />
          </Col>
          <Col xs={12} md={7}>
            <ChatInbox />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default ChatPage;
