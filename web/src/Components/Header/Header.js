import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

class Header extends Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="white" variant="light">
        <Navbar.Brand href="/">Common Voice</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="Contribute">Contribute</Nav.Link>
            <Nav.Link href="languages">languages</Nav.Link>
            <Nav.Link href="login">Login</Nav.Link>

            <Nav.Link href="signup">SignUp</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
