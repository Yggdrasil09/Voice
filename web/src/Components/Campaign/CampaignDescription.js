import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Divider } from "antd";
import { Badge, Form, Button } from "react-bootstrap";
import OtpInput from "react-otp-input";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

import "antd/dist/antd.css";
import url from "../../url_service";
import "./Campaign.css";

const cookies = new Cookies();

class CampaignDescription extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      mobile: "",
      otp: "",
      response: "",
      redirect: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOtpSubmit = this.handleOtpSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
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
          mobile: ""
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleOtpSubmit(e) {
    e.preventDefault();
    let data = {
      message: this.state.otp,
      time: this.state.response
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
          localStorage.setItem("LoginMethod", "speak");
          if (data) {
            this.setState({
              redirect: true
            });
          }
        }
      })
      .catch(er => {
        console.log(er);
      });
  }

  componentWillMount() {
    let data = {
      p_campaign_id: localStorage.getItem("campaignId")
    };
    fetch(url + "/campaignDetails?p_campaign_id=" + data.p_campaign_id, {
      method: "POST"
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          list: data
        });
        console.log(this.state.list);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleRedirect() {
    if (this.state.redirect) {
      return <Redirect to="/speak" />;
    }
  }

  render() {
    return (
      <Container className="con-border">
        {this.handleRedirect()}
        <Row>
          <Col md={8} className="description-col">
            <img
              src={require("../../img/speakingcampaign.jpg")}
              alt="campaign"
              className="campaignspeakdesp"
            />
          </Col>
          <Col md={4} className="campdesc">
            <h2 className="camptitle">
              {this.state.list.campaign_name+" "}
              {this.state.list.paid === "yes" && (
                <Badge pill variant="danger">
                  Paid
                </Badge>
              )}
            </h2>
            <h3 className="campsubtitle">{this.state.list.lang_id === "ENG"
              ? "English"
              : this.state.list.lang_id === "HIN"
              ? "Hindi"
              : "Telugu"}</h3>
            <h4>{this.state.list.campaign_description_short}</h4>
            <h4>Duration : {this.state.list.ends_in} days</h4>
          </Col>
        </Row>
        <Divider>
          <h3>About the campaign</h3>
        </Divider>
        <Row>
          <Col>{this.state.list.campaign_description_long}</Col>
        </Row>
        <Divider>
          <h3>Register</h3>
        </Divider>
        <Row>
          <Col>
            <h4>Enter Mobile number</h4>
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
        <Divider>
          <h3>Verify Otp</h3>
        </Divider>
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
        <Row>
          <h1> </h1>
        </Row>
      </Container>
    );
  }
}

export default CampaignDescription;
