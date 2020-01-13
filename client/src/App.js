import React, { Fragment } from 'react';
import { AuthContextProvider, AuthContextConsumer } from './AuthContext';
import { Navbar, Nav, Form } from "react-bootstrap";
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";

import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import EmployeesList from "./components/EmployeesList";

const userLoggedIn = (
  <AuthContextConsumer>
    { ({ logout }) => (
    <Fragment>
      <Link to="login">
        Jimmy Kimmel
      </Link>
      <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
    </Fragment>)}
  </AuthContextConsumer>);

const unauthenticatedUser = (
  <Fragment>
    <Link to="login">
        Login
    </Link>
    <Link to="register">
        Register
    </Link>
  </Fragment>)

const Toolbar = withRouter(() => {
  
  return (
    <AuthContextConsumer>
      { ({ user }) => {
        return (
          <Navbar bg="dark" className="mr-auto">
            <Navbar.Brand>Big logo</Navbar.Brand>   
            <Navbar.Collapse className="justify-content-end">
              { user ? userLoggedIn : unauthenticatedUser }
            </Navbar.Collapse>
          </Navbar>)}
      }
    </AuthContextConsumer>)
});


function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPage/>
          </Route>
          <Route path="/register">
            <RegisterPage/>
          </Route>
          <Route path="/">
              <Toolbar/>
              <EmployeesList/>
          </Route>
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
