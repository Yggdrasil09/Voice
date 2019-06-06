import React, { Component } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import url from '../../url_service.js'

class TwofactorLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      response: "",
      redirectOtp: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ mobile: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch(url + "/otpSend?phoneNo=" + this.state.mobile, {
      method: "POST"
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          response: data.time,
          mobile: "",
        });
        setTimeout(()=>{
          this.props.dispatch({ type: "ADD_OTPID", otpId: this.state.response });
          this.setState({
            redirectOtp: true,
          })
        },0)
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderRedirectOtp() {
    if (this.state.redirectOtp) {
      return <Redirect to="/otpcheck" />;
    }
  }
  render() {
    return (
      <Container>
        {this.renderRedirectOtp()}
        <Row>
          <Col>
            <div className="form-signup">
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicmobile">
                  <Form.Label>Mobile No.</Form.Label>
                  <Form.Control
                    name="mobile"
                    onChange={this.handleChange}
                    placeholder="Enter mobile no."
                    value={this.state.mobile}
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

TwofactorLogin.propTypes = {
  otpLoginId: PropTypes.string.isRequired,
  campaignId: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = function(state) {
  return {
    otpLoginId: state.otpLoginId,
    campaignId: state.campaignId,
  };
};

export default connect(mapStateToProps)(TwofactorLogin);
