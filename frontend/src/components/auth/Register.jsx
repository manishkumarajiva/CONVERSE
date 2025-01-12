import React, { useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from '../../loader/Loader';
import { RegisterHandeler } from "./AuthAPI";
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: '',
  };

  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  const [show, setShow] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  

  const showHandler = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  const formInputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    if(file){
        setFormData({...formData, avatar : file});
    }
  }

  const formValidation = (data) => {
    const errors = {};

    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Password Should be Same";
    } else if (data.password.length < 6) {
      errors.password = "Password length should be greater then 5";
    }
    return errors;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    
    setSubmitting(true); // animation

    const error = formValidation(formData);
    if (error.password) {
      toast.warning(error.password);
      setSubmitting(false);
    } else if (error.confirmPassword) {
      toast.warning(error.confirmPassword);
      setSubmitting(false);
    } else {
      // submit form
      const registerUser = new FormData();
      registerUser.append("name", formData.name);
      registerUser.append("email", formData.email);
      registerUser.append("password", formData.password);
      registerUser.append("avatar", formData.avatar);

    
      (async () => {
        const response = await RegisterHandeler(registerUser);
        toast.success('Register Successfully');
        setSubmitting(false);
        localStorage.setItem('userInfo',JSON.stringify(response))
        navigate('/chat');
      })()
    }
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
                required
              />
            </InputGroup>
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
                required
              />
            </InputGroup>
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
                required
              />
              <InputGroup.Text onClick={showHandler}>
                {" "}
                {show ? "Hide" : "Show"}{" "}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label> Password </Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={formInputHandler}
                type={show ? "text" : "password"}
                placeholder="confirm password"
                className="shadow-none"
                required
              />
              <InputGroup.Text onClick={showHandler}>
                {" "}
                {show ? "Hide" : "Show"}{" "}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Avatar</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                name="avatar"
                onChange={avatarHandler}
                type="file"
                placeholder="choose avatar"
                className="shadow-none"
                required
              />
            </InputGroup>
          </Form.Group>
        </Container>

        <Container fluid className="d-grid">
          <Button type="submit"> 
            REGISTER 
            {isSubmitting && <Loader></Loader>}
          </Button>
        </Container>
      </Form>
    </React.Fragment>
  );
};

export default Register;
