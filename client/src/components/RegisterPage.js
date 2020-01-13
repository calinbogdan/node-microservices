import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Form, Container, Button } from "react-bootstrap";
import { AuthContextConsumer } from "../AuthContext";

const RegisterPage = ({ history }) => {
    const [newUser, setNewUser] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    });
  
    return (
    <Container>
      <AuthContextConsumer>
        { ({ setLoggedUser }) => {
          return (<Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>First name</Form.Label>
              <Form.Control type="text" placeholder="Enter first name" onChange={event => {
                  setNewUser({
                    ...newUser,
                    firstName: event.target.value
                  })
                }}/>
            </Form.Group>
  
            <Form.Group controlId="formLastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control type="text" placeholder="Enter last name" onChange={event => {
                  setNewUser({
                    ...newUser,
                    lastName: event.target.value
                  })
                }}/>
            </Form.Group>
  
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={event => {
                  setNewUser({
                    ...newUser,
                    email: event.target.value
                  })
                }}/>
            </Form.Group>
  
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={event => {
                  setNewUser({
                    ...newUser,
                    password: event.target.value
                  })
                }}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={event => {
              event.preventDefault();
  
              axios.post("http://localhost:5000/auth/register")
                .then(({ data }) => {
                  setLoggedUser(data);
                  history.push("/");
                });
            }}>
              Register
            </Button>
          </Form>
        )}}
      </AuthContextConsumer>
    </Container>)
  };

  export default withRouter(RegisterPage);