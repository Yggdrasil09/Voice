import React, { Component } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from "react-bootstrap/Navbar";

class Header extends Component {
  render() {
    return (
		<Navbar collapseOnSelect expand="lg" bg="light" variant="light">
		<Navbar.Brand href="#home">Voices</Navbar.Brand>
		<Navbar.Toggle aria-controls="responsive-navbar-nav" />
		<Navbar.Collapse id="responsive-navbar-nav">
		  <Nav className="mr-auto">
			<Nav.Link href="#features">Contribute</Nav.Link>
			<Nav.Link href="#pricing">languages</Nav.Link>
		  </Nav>
		</Navbar.Collapse>
	  </Navbar>
    );
  }
}

export default Header;
