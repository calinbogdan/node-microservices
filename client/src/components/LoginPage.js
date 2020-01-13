import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Form, Container, Button } from "react-bootstrap";
import axios from "axios";

import { AuthContextConsumer } from "../AuthContext";


const LoginPage = ({ history }) => {
    const [loginData, setLoginData] = useState({
      email: "",
      password: ""
    });
  
    return (
        <AuthContextConsumer>
            { ({ setLoggedUser }) => (            
                <Container>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={event => setLoginData({
                            ...loginData,
                            email: event.target.value
                            })}/>
                        </Form.Group>
            
                        <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={event => setLoginData({
                            ...loginData,
                            password: event.target.value
                            })}/>
                        </Form.Group>
                        <Button 
                        variant="primary" 
                        type="submit" 
                        onClick={event => {
                            event.preventDefault();
                            
                            const { email, password } = loginData;
                            axios.post("http://localhost:5000/auth/login", { email, password })
                            .then(({ data }) => {
                                setLoggedUser(data);
                                history.push("/");
                        })}}>
                        Login
                        </Button>
                    </Form>
                </Container>)
            }
        </AuthContextConsumer>
      )
  }

export default withRouter(LoginPage);