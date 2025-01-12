import React, { useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import Loader from "../../loader/Loader";
import { toast } from "react-toastify";
import { LoginHandeler } from "./AuthAPI";
import { useNavigate } from "react-router-dom";


const Login = () => {

  const navigate = useNavigate();
  const initialState = { email: "", password: "" };
  const [formData, setFormData] = useState(initialState);
  const [show, setShow] = useState(false);
  const [isLogin, setLogin] = useState(false);


  const showHandler = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  const formInputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLogin(true);

    (async () => {
      const response = await LoginHandeler(formData);
      toast.success('Login Successfully');
      setLogin(false);
      localStorage.setItem('userInfo', JSON.stringify(response))
      navigate('/chat')
    })()
    console.log(formData);
  };

  const gustUserHandler = (e) => {
    e.preventDefault();
    setFormData({
      email: "guest123@gmail.com",
      password: "guest@123",
    });
  };

  return (
    <React.Fragment>
      <Form onSubmit={submitHandler}>
        <Container fluid>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                name="email"
                value={formData.email}
                onChange={formInputHandler}
                type="email"
                placeholder="Email"
                className="shadow-none"
              />
            </InputGroup>
            <Form.Text> </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
              name="password"
              value={formData.password}
              onChange={formInputHandler}
              type={show ? 'text' : 'password'}
              placeholder="Password"
              className="shadow-none"
            />
            <InputGroup.Text onClick={showHandler} id="basic-addon1"> {show ? 'Hide' : 'Show'} </InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </Container>

        <Container fluid className="d-grid gap-2">
          <Button type="submit" variant="primary">
            LOGIN
            {isLogin && <Loader></Loader>}
          </Button>
          <Button onClick={gustUserHandler} type="button" variant="danger">
            {" "}
            Guest User Credentials{" "}
          </Button>
        </Container>
      </Form>
    </React.Fragment>
  );
};

export default Login;
