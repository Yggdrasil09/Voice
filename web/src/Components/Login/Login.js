import React, { Component } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";

import "./Login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch("http://10.2.135.75:5000/validateLogin",{
      method: "POST",
      body : JSON.stringify(this.state)
    }).then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data)
      })
      .catch(er => {
        console.log(er);
      });
  }

  handleValueChange(e) {
    e.preventDefault();
    if(e.target.name === "username")
    {
      this.setState({
        username : e.target.value
      })
    }
    if(e.target.name === "password")
    {
      this.setState({
        password : e.target.value
      })
    }
}

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <div className="form-login">
              <Form onSubmit = {this.handleSubmit}>
                <Form.Label>Username</Form.Label>
                <Form.Control placeholder="Enter Username" name="username" onChange={this.handleValueChange}/>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleValueChange}/>
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

export default Login;
