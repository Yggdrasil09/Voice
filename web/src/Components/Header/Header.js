import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

import "./Header.css";

const cookies = new Cookies();

class Header extends Component {
  constructor() {
    super();
    this.state = {
      isLogged: localStorage.getItem("LoginMethod"),
      displayLogout: false,
      redirect: false
    };
    this.logout = this.logout.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  logout() {
    localStorage.setItem("LoginMethod", "");
    localStorage.setItem("uid", null);
    cookies.remove("token", { path: "/" });
    if (this.state.displayLogout) {
      this.setState({
        redirect: true,
        displayLogout: false,       
      });
    }
  }

  redirect() {
    if(this.state.redirect) {
      return <Redirect to="/" />;
    }
  }

  componentDidMount() {
    if (this.state.isLogged === "speak" || this.state.isLogged === "listen") {
      if (!this.state.displayLogout) {
        this.setState({
          displayLogout: true
        });
      }
    }
  }

  render() {
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="white"
        variant="light"
        className="header"
      >
        {this.redirect()}
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
          {this.state.displayLogout ? (
            <Button variant="outline-danger" onClick={this.logout}>
              Logout
            </Button>
          ) : (
            <div />
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
