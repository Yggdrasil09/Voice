import React, { Component } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import OtpInput from "react-otp-input";
import {Redirect} from 'react-router-dom';

class OtpLogin extends Component {
  t;
  constructor(props) {
    super(props);
    this.state = {
      otpId: this.props.otpLoginId,
      otp: "",
      redirect : false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = {
      message: this.state.otp,
      time: this.state.otpId
    };
    console.log(data);
    fetch("http://10.2.138.28:5000/otpVerify", {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        if(data.user_id)
        {
          this.setState({
            redirect : true,
          })
        }
      })
      .catch(er => {
        console.log(er);
      });
  }

  handleRedirect(){
    if(this.state.redirect)
    {
      return <Redirect to="/speak" />
    }
  }

  render() {
    return (
      <Container>
        {this.handleRedirect()}
        <Row>
          <Col>
            <div className="form-signup">
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicmobile">
                  <Form.Label>Enter OTP.</Form.Label>
                  <div className= "otpInput">
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
