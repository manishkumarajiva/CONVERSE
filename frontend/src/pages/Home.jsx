import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import { Container, Row, Col } from "react-bootstrap";


const Home = () => {
  const navigate = useNavigate();
  const [swap, setSwap] = useState(true);

  const swapHandler = (e) => {
    setSwap(!swap);
  };

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (token?.length) navigate("/chat");
  }, [navigate]);

  return (
    <Container
      fluid
      style={glassStyle}
      className="mt-5 text-white py-4 px-2 rounded mx-auto"
    >
      <Row className="mx-2 mb-2">
        <Col
          onClick={swapHandler}
          className={`p-2 text-center rounded-pill ${
            swap ? "bg-light text-dark" : "bg-transparent text-white fw-bold"
          }`}
          role='button'
        >
          Login
        </Col>

        <Col
          onClick={swapHandler}
          className={`p-2 text-center rounded-pill ${
            swap ? "bg-transparent text-white fw-bold" : "bg-light text-dark"
          }`}
          role="button"
        >
          Register
        </Col>
      </Row>
      <Row fluid>{swap ? <Login /> : <Register />}</Row>
    </Container>
  );
};

export default Home;








const glassStyle = {
  maxWidth : '500px',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(15px)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.25)',
  borderRadius: '15px',
  padding: '30px',
  transition: 'all 0.4s ease-out',
  ':hover': {
    backdropFilter: 'blur(20px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
  },
};