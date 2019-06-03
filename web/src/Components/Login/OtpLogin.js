import React, { Component } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import OtpInput from "react-otp-input";

class OtpLogin extends Component {
  t;
  constructor(props) {
    super(props);
    this.state = {
      otpId: this.props.otpLoginId,
      otp: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = {
      message: this.state.otp,
      time: this.state.otpId
    };
    console.log(data);
    fetch("http://10.2.138.219:5000/otpVerify", {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(er => {
        console.log(er);
      });
  }

  render() {
    return (
      <Container>
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
