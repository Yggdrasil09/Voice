import React, { Component } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import {connect} from 'react-redux';
import PropTypes from "prop-types";

import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    fetch("http://10.2.135.75:5000/validateLogin", {
      method: "POST",
      body: JSON.stringify(this.state),
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          username: "",
          password: "",
        });
      })
      .catch(er => {
        console.log(er);
      });
  }

  handleValueChange(e) {
    e.preventDefault();
    if (e.target.name === "username") {
      this.setState({
        username: e.target.value,
      });
    }
    if (e.target.name === "password") {
      this.setState({
        password: e.target.value,
      });
    }
  }

  componentDidMount(){
    console.log(this.props.campaignId)
  }

  render() {
    return (
      <Container>
        <Row>
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
  task : PropTypes.string.isRequired,
	dispatch: PropTypes.func.isRequired
}

const mapStateToProps = function(state) {
	return {
    campaignId : state.campaignId,
    task : state.task,
    userId : state.userId,
	};
};

export default connect(mapStateToProps)(Login);
