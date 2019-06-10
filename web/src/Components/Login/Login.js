import React, { Component } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import Cookies from 'universal-cookie'

import url from "../../url_service.js";
import "./Login.css";

const cookies = new Cookies();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: false,
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    fetch(url + "/validateLogin", {
      method: "POST",
      body: JSON.stringify(this.state)
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        if (data.message === "login sucessfull") {
          localStorage.setItem("uid",data.uid);
          localStorage.setItem("LoginMethod","listen")
          let sliced = data.token.slice(2, data.token.length - 1);
          cookies.set("token", sliced, { path: "/" });
          this.setState({
            username: "",
            password: "",
            redirect: true,
          });
        }
      })
      .catch(er => {
        console.log(er);
      });
  }

  handleValueChange(e) {
    e.preventDefault();
    if (e.target.name === "username") {
      this.setState({
        username: e.target.value
      });
    }
    if (e.target.name === "password") {
      this.setState({
        password: e.target.value
      });
    }
  }

  handleRedirect() {
    if (this.state.redirect) {
      return <Redirect to="/lttasks" />;
    }
  }

  render() {
    return (
      <Container>
        {this.handleRedirect()}
        <Row>
          <script src="https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.js" />
          <link
            type="text/css"
            rel="stylesheet"
            href="https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.css"
          />
          <Col>
            <div className="form-login">
              <Form onSubmit={this.handleSubmit}>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  placeholder="Enter Username"
                  name="username"
                  onChange={this.handleValueChange}
                />
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleValueChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

Login.propTypes = {
  campaignId: PropTypes.number.isRequired,
  task: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = function(state) {
  return {
    campaignId: state.campaignId,
    task: state.task,
    userId: state.userId
  };
};

export default connect(mapStateToProps)(Login);
