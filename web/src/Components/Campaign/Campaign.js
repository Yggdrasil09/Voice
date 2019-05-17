import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Card, Badge, Button, Nav } from "react-bootstrap";

import "./Campaign.css";

class Campaign extends Component {
  render() {
    return (
      <Card >
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="#active">
            <Nav.Item>
              <Nav.Link href="#active">Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#upcoming">Upcoming</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#past">Past</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Container className="contain-height" >
          <h1 id="active" className="event-head">Active Campaigns</h1>
          <Row>
            <Col sm={6} lg={4}>
              <Card className="campaigns" style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={require("../../img/campaign.png")}
                />
                <Card.Body>
                  <Card.Title>
                    Campaign 1{" "}
                    <Badge pill variant="danger">
                      Paid
                    </Badge>
                  </Card.Title>
                  <Card.Subtitle>telugu</Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Card.Text>Duration : 12hrs</Card.Text>
                  <Button variant="primary">Start Contest</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} lg={4}>
              <Card className="campaigns" style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={require("../../img/campaign.png")}
                />
                <Card.Body>
                  <Card.Title>Campaign 1</Card.Title>
                  <Card.Subtitle>telugu</Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Card.Text>Duration : 12hrs</Card.Text>
                  <Button variant="primary">Start Contest</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} lg={4}>
              <Card className="campaigns" style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={require("../../img/campaign.png")}
                />
                <Card.Body>
                  <Card.Title>Campaign 1</Card.Title>
                  <Card.Subtitle>telugu</Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Card.Text>Duration : 12hrs</Card.Text>
                  <Button variant="primary">Start Contest</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <h1 id="upcoming" className="event-head">Upcoming Campaigns</h1>
          <Row >
            <Col sm={6} lg={4}>
              <Card className="campaigns" style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={require("../../img/campaign.png")}
                />
                <Card.Body>
                  <Card.Title>
                    Campaign 1{" "}
                    <Badge pill variant="danger">
                      Paid
                    </Badge>
                  </Card.Title>
                  <Card.Subtitle>telugu</Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Card.Text>Duration : 12hrs</Card.Text>
                  <Button variant="primary">Start Contest</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} lg={4}>
              <Card className="campaigns" style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={require("../../img/campaign.png")}
                />
                <Card.Body>
                  <Card.Title>Campaign 1</Card.Title>
                  <Card.Subtitle>telugu</Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Card.Text>Duration : 12hrs</Card.Text>
                  <Button variant="primary">Start Contest</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} lg={4}>
              <Card className="campaigns" style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={require("../../img/campaign.png")}
                />
                <Card.Body>
                  <Card.Title>Campaign 1</Card.Title>
                  <Card.Subtitle>telugu</Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Card.Text>Duration : 12hrs</Card.Text>
                  <Button variant="primary">Start Contest</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <h1 id="past" className="event-head">Past Campaigns</h1>
          <Row>
            <Col sm={6} lg={4}>
              <Card className="campaigns" style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={require("../../img/campaign.png")}
                />
                <Card.Body>
                  <Card.Title>
                    Campaign 1{" "}
                    <Badge pill variant="danger">
                      Paid
                    </Badge>
                  </Card.Title>
                  <Card.Subtitle>telugu</Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Card.Text>Duration : 12hrs</Card.Text>
                  <Button variant="primary">Start Contest</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} lg={4}>
              <Card className="campaigns" style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={require("../../img/campaign.png")}
                />
                <Card.Body>
                  <Card.Title>Campaign 1</Card.Title>
                  <Card.Subtitle>telugu</Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Card.Text>Duration : 12hrs</Card.Text>
                  <Button variant="primary">Start Contest</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} lg={4}>
              <Card className="campaigns" style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={require("../../img/campaign.png")}
                />
                <Card.Body>
                  <Card.Title>Campaign 1</Card.Title>
                  <Card.Subtitle>telugu</Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Card.Text>Duration : 12hrs</Card.Text>
                  <Button variant="primary">Start Contest</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Card>
    );
  }
}

export default Campaign;
