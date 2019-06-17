import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import "./Header.css";

const cookies = new Cookies();

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: localStorage.getItem("LoginMethod"),
      displayLogout: false,
      redirect: false,
      falselogged : this.props.falselogged
    };
    this.logout = this.logout.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
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

  handleRedirect() {
    if(this.state.redirect) {
      this.setState({
        redirect:false,
      })
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
        {this.handleRedirect()}
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
            <Nav.Link href="stats">Campaign Stats</Nav.Link>
            <Nav.Link href="profile">Profile</Nav.Link>
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

Header.propTypes = {
  falselogged: PropTypes.number.isRequired,
	dispatch: PropTypes.func.isRequired
}


const mapStateToProps = function(state) {
	return {
    falselogged : state.falselogged,
    userId : state.userId,
	};
};

export default connect(mapStateToProps)(Header);
