import React, { Fragment } from 'react';
import { AuthContextProvider, AuthContextConsumer } from './AuthContext';
import { Navbar, Nav } from "react-bootstrap";
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";

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
          <Navbar bg="dark">
            <Navbar.Brand>Big logo</Navbar.Brand>          
            { user ? userLoggedIn : unauthenticatedUser }
          </Navbar>)}
      }
    </AuthContextConsumer>)
});

const EmployeesList = () => (<div></div>);

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
