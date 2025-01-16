import React, { useState } from "react";
import NavBar from "../miscellaneous/NavBar";
import MyChats from "../components/chat/MyChats";
import { Container, Row, Col } from "react-bootstrap";
import ChatInbox from "../components/chat/ChatInbox";


const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <React.Fragment>
      <NavBar></NavBar>
      <Container className="py-2 mt-2" fluid>
        <Row>
          <Col xs={12} md={4}>
            <MyChats fetchAgain={fetchAgain} />
          </Col>
          <Col xs={12} md={8}>
            <ChatInbox fetchAgain={fetchAgain} onFetch={setFetchAgain} />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default ChatPage;
