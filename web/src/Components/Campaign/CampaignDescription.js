import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";

import "./Campaign.css";

class CampaignDescription extends Component {
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
              Campaign Name{" "}
              <Badge pill variant="danger">
                Paid
              </Badge>
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Campaign Subtitle
            </Card.Subtitle>
            <Card.Text>
              Some quick example text about campaigns to build on the card title
              and make up the bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Start Speak</Button>
            <Button variant="primary">Start Listen</Button>
          </Col>
        </Row>
        <Row>
          <Card style={{ width: "99%" }}>
            <Card.Body>
              <Card.Title>Card Description</Card.Title>
              <Card.Text>
                A Large description about the campaign is to be presented here
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    );
  }
}

export default CampaignDescription;
