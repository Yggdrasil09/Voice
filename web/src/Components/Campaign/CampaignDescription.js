import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap";

import "./Campaign.css";

class CampaignDescription extends Component {
  render() {
    return (
      <Container className="con-border">
        <Row className="con-border">
          <Col md={8}>
            <Card className="campaigns campaignDes" style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                className="campImg"
                src={require("../../img/campdescription.jpg")}
              />
            </Card>
          </Col>
          <Col md={4}>
            <Card.Title>Campaign Name</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Campaign Subtitle
            </Card.Subtitle>
            <Card.Text>
              Some quick example text about campaigns to build on the card title
              and make up the bulk of the card's content.
            </Card.Text>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CampaignDescription;
