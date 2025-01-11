import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from '../components/Authentication/Login';
import Register from '../components/Authentication/Register';
import { Container, Row, Col } from "react-bootstrap";


const Home = () => {
  const navigate = useNavigate();
  const [swap, setSwap] = useState(false);

  const swapHandler = (e) => {
    setSwap(!swap);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) navigate("/chat");
  }, [navigate]);

  return (
    <Container
      fluid
      style={glassStyle}
      className="mt-5 text-white w-25 py-4 px-2 rounded mx-auto"
    >
      <Row className="mx-2 mb-2">
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

export default Home;








const glassStyle = {
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