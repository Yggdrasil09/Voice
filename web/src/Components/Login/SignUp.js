import React, { Component } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";

import "./Login.css";

class SignUp extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <div className="form-signup">
              <Form>
                <Form.Label>Name</Form.Label>
                <Form.Control placeholder="Enter name" />
                <Form.Label>Username</Form.Label>
                <Form.Control placeholder="Enter Username" />
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicmobile">
                  <Form.Label>Mobile No.</Form.Label>
                  <Form.Control type="email" placeholder="Enter mobile no." />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
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

export default SignUp;
