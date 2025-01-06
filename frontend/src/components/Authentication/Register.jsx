import React, { useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";

const Register = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    avatar: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [show, setShow] = useState(false);

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
    const registerUser = new FormData();
    registerUser.append('name', formData.name);
    registerUser.append('email', formData.email);
    registerUser.append('password', formData.password);
    registerUser.append('avatar', formData.avatar);
    console.log(formData, FormData);
  };

  return (
    <React.Fragment>
      <Form onSubmit={submitHandler}>
        <Container fluid>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                name="name"
                value={formData.name}
                onChange={formInputHandler}
                type="text"
                placeholder="full name"
                className="shadow-none"
              />
            </InputGroup>
            <Form.Text> </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label> Email </Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                name="email"
                value={formData.email}
                onChange={formInputHandler}
                type="email"
                placeholder="your@gmail.com"
                className="shadow-none"
              />
            </InputGroup>
            <Form.Text> </Form.Text>
          </Form.Group>

          {/* password */}

          <Form.Group className="mb-3">
            <Form.Label> Password </Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                name="password"
                value={formData.password}
                onChange={formInputHandler}
                type={show ? "text" : "password"}
                placeholder="password"
                className="shadow-none"
              />
              <InputGroup.Text onClick={showHandler}>
                {" "}
                {show ? "Hide" : "Show"}{" "}
              </InputGroup.Text>
            </InputGroup>
            <Form.Text> </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Avatar</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                name="avatar"
                value={formData.avatar}
                onChange={formInputHandler}
                type="file"
                placeholder="choose avatar"
                className="shadow-none"
              />
            </InputGroup>
            <Form.Text> </Form.Text>
          </Form.Group>
        </Container>

        <Container fluid className="d-grid">
          <Button type="submit"> REGISTER </Button>
        </Container>
      </Form>
    </React.Fragment>
  );
};

export default Register;
