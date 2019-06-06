import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import './Header.css'

class Header extends Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="white" variant="light" className="header">
        <Navbar.Brand href="/">Common Voice</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="tasks">Tasks</Nav.Link>
            <Nav.Link href="lttasks">LTtasks</Nav.Link>
            <Nav.Link href="login">Login</Nav.Link>
            <Nav.Link href="campdescription">CampDescription</Nav.Link>
            <Nav.Link href="otplogin">2FactorLogin</Nav.Link>
            <Nav.Link href="signup">SignUp</Nav.Link>
            <Nav.Link href="createcampaign">Create campaign</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
