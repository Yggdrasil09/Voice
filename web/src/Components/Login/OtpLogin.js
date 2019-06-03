import React, { Component } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class OtpLogin extends Component {
  t;
  constructor(props) {
    super(props);
    this.state = {
      otpId: this.props.otpLoginId,
      otp: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = {
      message: this.state.otp,
      time: this.state.otpId
    };
    fetch("http://10.2.138.219:5000/otpVerify", {
      method: "POST",
      body: data
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          mobile: "",
          response: data
        });
        this.props.dispatch({ type: "ADD_OTPID", otpId: data });
      })
      .catch(er => {
        console.log(er);
      });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      otp: e.target.value
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
                  <Form.Control
                    name="mobile"
                    onChange={this.handleChange}
                    placeholder="Enter OTP"
                    value={this.state.otp}
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

OtpLogin.propTypes = {
  otpLoginId: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = function(state) {
  return {
    otpLoginId: state.otpLoginId
  };
};

export default connect(mapStateToProps)(OtpLogin);
