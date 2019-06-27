import React, { Component } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import OtpInput from "react-otp-input";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

import Loader from 'react-loader-spinner'

import url from "../../url_service.js";

const cookies = new Cookies();

class OtpLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otpId: this.props.otpLoginId,
      otp: "",
      redirect: false,
      isLoading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleSubmit(e) {
    this.setState({isLoading : true});
    e.preventDefault();
    let data = {
      message: this.state.otp,
      time: this.state.otpId
    };
    console.log(data);
    fetch(url + "/otpVerify", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    })
      .then(res => {
        console.log(res.headers.get("token"));
        return res.json();
      })
      .then(data => {
        console.log(data);
        if (data.message === "success") {
          let sliced = data.token.slice(2, data.token.length - 1);
          cookies.set("token", sliced, { path: "/" });
          console.log(document.cookie);
          localStorage.setItem("uid", data.uid);
          localStorage.setItem("LoginMethod","listen")
          if (data) {
            this.setState({
              redirect: true,
              isLoading: false,
            });
          }
        }
      })
      .catch(er => {
        console.log(er);
      });
  }

  handleRedirect() {
    if (this.state.redirect) {
      return <Redirect to="/lttasks" />;
    }
  }

  // componentDidMount() {
  //   this.setState({isLoading: true});
  // }

  render() {
    if (this.state.isLoading) {
      return (
        <Container className="contain-height">
        <h4 id="fetching" className="center">
            Logging you in.......
        </h4>
        <Row className="center">
            <Loader type="Bars" color="#D3D3D3" height="100" width="100"/>
        </Row>
        {this.handleRedirect()}
      </Container>
      );
    }
    return (
      <Container>
        {this.handleRedirect()}
        <Row>
          <Col>
            <div className="form-signup">
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicmobile">
                  <Form.Label>Enter OTP.</Form.Label>
                  <div className="otpInput">
                    <OtpInput
                      onChange={otp =>
                        this.setState({
                          otp: otp
                        })
                      }
                      numInputs={6}
                      separator={<span className="spacing" />}
                    />
                  </div>
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

OtpLogin.propTypes = {
  otpLoginId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = function(state) {
  return {
    otpLoginId: state.otpLoginId
  };
};

export default connect(mapStateToProps)(OtpLogin);
