import React, { Component } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./Login.css";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      username: "",
      email: "",
      mobile: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = {
      fname: this.state.name,
      payment: this.state.username,
      email: this.state.email,
      mobile: this.state.mobile,
      password: this.state.password,
    };
    console.log(data);
    fetch("http://10.2.135.75:5000/signUp", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          name: "",
          username: "",
          email: "",
          mobile: "",
          password: "",
        });
      })
      .catch(er => {
        console.log(er);
      });
  }

  handleChange(e) {
    e.preventDefault();
    if (e.target.name === "name") {
      this.setState({
        name: e.target.value,
      });
    }
    if (e.target.name === "username") {
      this.setState({
        username: e.target.value,
      });
    }
    if (e.target.name === "email") {
      this.setState({
        email: e.target.value,
      });
    }
    if (e.target.name === "mobile") {
      this.setState({
        mobile: e.target.value,
      });
    }
    if (e.target.name === "password") {
      this.setState({
        password: e.target.value,
      });
    }
  }
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <div className="form-signup">
              <Form onSubmit={this.handleSubmit}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  placeholder="Enter name"
                  name="name"
                  onChange={this.handleChange}
                  value = {this.state.name}
                />
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={this.handleChange}
                    value = {this.state.email}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Label>Payment</Form.Label>
                <Form.Control
                  placeholder="Enter Payment method"
                  name="username"
                  onChange={this.handleChange}
                  value = {this.state.username}
                />
                <Form.Group controlId="formBasicmobile">
                  <Form.Label>Mobile No.</Form.Label>
                  <Form.Control
                    name="mobile"
                    onChange={this.handleChange}
                    placeholder="Enter mobile no."
                    value = {this.state.mobile}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                    value = {this.state.password}
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

SignUp.propTypes = {
  campaignId: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = function(state) {
  return {
    campaignId: state.campaignId,
    userId: state.userId,
  };
};

export default connect(mapStateToProps)(SignUp);
