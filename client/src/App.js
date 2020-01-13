import React, { Fragment, useState } from 'react';
import './App.css';
import { AuthContextProvider, AuthContextConsumer } from './AuthContext';
import { Navbar, Nav, Form, Button, Container } from "react-bootstrap";
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link
 } from "react-router-dom";
 import axios from "axios";

const Toolbar = () => {
  const userLoggedIn = (
    <Fragment>
      <Nav.Link>Jimmy Kimmel</Nav.Link>
      <Nav.Link>Logout</Nav.Link>
    </Fragment>);

  const unauthenticatedUser = (
    <Fragment>
      <Link to="login">
          Login
        {/* <Nav.Link>
        </Nav.Link> */}
      </Link>
      <Link to="register">
          Register
        {/* <Nav.Link>
        </Nav.Link> */}
      </Link>
    </Fragment>)
  
  return (
    <AuthContextConsumer>
      { ({ user }) => (
      <Navbar bg="dark">
        <Navbar.Brand>Big logo</Navbar.Brand>          
        { user ? userLoggedIn : unauthenticatedUser }
      </Navbar>)}
    </AuthContextConsumer>)
}

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  return (
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
          <Button variant="primary" type="submit" onClick={event => {
            event.preventDefault();
            
            const { email, password } = loginData;
            axios.post("http://localhost:5000/auth/login", { email, password })
              .then(response => console.log(response))
              .catch(response => console.log(response));
          }}>
            Login
          </Button>
        </Form>
      </Container>
    )
}

const RegisterPage = () => {
  return (
  <Container>
    <Form>
      <Form.Group controlId="formFirstName">
        <Form.Label>First name</Form.Label>
        <Form.Control type="text" placeholder="Enter first name" />
      </Form.Group>

      <Form.Group controlId="formLastName">
        <Form.Label>Last name</Form.Label>
        <Form.Control type="text" placeholder="Enter last name" />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
  </Container>)
}


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginPage/>
        </Route>
        <Route path="/register">
          <RegisterPage/>
        </Route>
        <Route path="/">
          <AuthContextProvider>
            <Toolbar/>
          </AuthContextProvider>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
