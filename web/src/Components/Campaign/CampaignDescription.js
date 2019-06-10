import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";

import url from "../../url_service";
import "./Campaign.css";

class CampaignDescription extends Component {
  constructor() {
    super();
    this.state = {
      list: []
    };
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

  render() {
    return (
      <Container className="con-border">
        <Row className="con-border">
          <Col md={8} className="pad-col">
            <Card className="campaigns campaignDes" style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                className="campImg"
                src={require("../../img/campdescription.jpg")}
              />
            </Card>
          </Col>
          <Col md={4} className="pad-col campaigndetails">
            <Card.Title>
              {this.state.list.campaign_name + " "}

              {this.state.list.paid === "yes" ? (
                <Badge pill variant="danger">
                  Paid
                </Badge>
              ) : (
                <div />
              )}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {this.state.list.lang_id === "ENG"
                ? "English"
                : this.state.list.lang_id === "HIN"
                ? "Hindi"
                : "Telugu"}
            </Card.Subtitle>
            <Card.Text>{this.state.list.campaign_description_short}</Card.Text>
            <Card.Text>
              Duration : {this.state.list.ends_in + " "}days
            </Card.Text>
            <Card.Text>
              {this.state.list.paid === "yes" ? (
                <p>
                  Amount paid for Task Completion : Rs.{this.state.list.amount}/-
                </p>
              ) : (
                <div />
              )}
            </Card.Text>
            <Button variant="primary">Start Speak</Button>
            <Button variant="primary">Start Listen</Button>
          </Col>
          <Row style={{ width: "100vw" }}>
            <Card style={{ width: "99%" }}>
              <Card.Body>
                <Card.Title>Campaign Description</Card.Title>
                <Card.Text>
                  {this.state.list.campaign_description_long}
                </Card.Text>
              </Card.Body>
            </Card>
          </Row>
        </Row>
      </Container>
    );
  }
}

export default CampaignDescription;
