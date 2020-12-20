// import logo from './logo.svg';
import './App.css';import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import Dp from './Dp';
import Ivideo from './Ivideo';
import Photo from './Photo';
import { Nav, Navbar, } from 'react-bootstrap';

export default function App() {
  return (
    <Router>

        <Navbar bg="light" expand="lg">
  <Navbar.Brand> <h2 style={{color:"crimson" , textAlign:"center" }} >InstaDownloader</h2> </Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">

      <Nav.Link><Nav.Item>          <NavLink to="/" exact >Dp</NavLink>              </Nav.Item></Nav.Link>
      <Nav.Link><Nav.Item>          <NavLink to="/photo" exact >Photo</NavLink>        </Nav.Item></Nav.Link>
      <Nav.Link><Nav.Item>          <NavLink to="/video" exact >Video</NavLink>        </Nav.Item></Nav.Link>

      
    </Nav>
  </Navbar.Collapse>
</Navbar>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          
        <Route exact path="/">
            <Dp />
          </Route>
          <Route exact path="/photo">
            <Photo />
          </Route>
          <Route exact path="/video">
            <Ivideo />
          </Route>

        </Switch>

    </Router>
  );
}
