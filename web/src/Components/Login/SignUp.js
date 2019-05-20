import React, { Component } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";

import "./Login.css";

class SignUp extends Component {
  constructor(){
    super();
    this.state={
      name : "",
      username : "",
      email : "",
      mobile : "",
      password : "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
  }

  handleChange(e){
    e.preventDefault();
    if(e.target.name === "name")
    {
      this.setState({
        name : e.target.value
      })
    }
    if(e.target.name === "username")
    {
      this.setState({
        username : e.target.value
      })
    }
    if(e.target.name === "email")
    {
      this.setState({
        email:e.target.value
      })
    }
    if(e.target.name === "mobile")
    {
      this.setState({
        mobile : e.target.value
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
            <div className="form-signup">
              <Form onSubmit={this.handleSubmit}>
                <Form.Label>Name</Form.Label>
                <Form.Control placeholder="Enter name" name="name" onChange={this.handleChange}/>
                <Form.Label>Username</Form.Label>
                <Form.Control placeholder="Enter Username" name="username" onChange={this.handleChange} />
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" name="email" onChange={this.handleChange}/>
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicmobile" name="mobile" onChange={this.handleChange}>
                  <Form.Label>Mobile No.</Form.Label>
                  <Form.Control type="email" placeholder="Enter mobile no." />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleChange}/>
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
