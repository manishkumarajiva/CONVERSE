import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Login from "./Login";
import Register from "./Register";
import "./Auth.css";

const AuthContainer = () => {
  const [swap, setSwap] = useState(false);

  const swapHandler = (e) => {
    setSwap(!swap);
  };

  return (
    <Container fluid id="glass" className="mt-5 text-white w-25 py-4 px-2 rounded mx-auto">
      <Row className="mx-2 mb-2 ">
        <Col
          onClick={swapHandler}
          className={`p-2 text-center rounded-pill ${
            swap ? "bg-light text-dark" : "bg-transparent text-white fw-bold"
          }`}
        >
          Login
        </Col>

        <Col
          onClick={swapHandler}
          className={`p-2 text-center rounded-pill ${
            swap ? "bg-transparent text-white fw-bold" : "bg-light text-dark"
          }`}
        >
          Register
        </Col>
      </Row>
      <Row fluid>{swap ? <Login /> : <Register />}</Row>
    </Container>
  );
};

export default AuthContainer;
