import React, { Component } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";

import "./Login.css";

class Login extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <div className="form-login">
              <Form.Label>Username</Form.Label>
              <Form.Control placeholder="Enter Username" />
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
