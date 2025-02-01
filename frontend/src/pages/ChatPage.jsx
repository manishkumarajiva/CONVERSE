import React, { useEffect, useState } from "react";
import NavBar from "../miscellaneous/NavBar";
import MyChats from "../components/chat/MyChats";
import { Container, Row, Col } from "react-bootstrap";
import ChatInbox from "../components/chat/ChatInbox";
import { ChatState } from "../context/ChatProvider";


const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <React.Fragment>
      <NavBar></NavBar>
      <Container className="py-2 mt-2" fluid>
        <Row>
          <Col xs={12} md={5} xl={4}>
            { user && <MyChats fetchAgain={fetchAgain} />}
          </Col>
          <Col xs={12} md={7} xl={8}>
            { user && <ChatInbox fetchAgain={fetchAgain} onFetch={setFetchAgain} />}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default ChatPage;
