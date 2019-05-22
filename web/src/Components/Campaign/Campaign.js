import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Card, Badge, Button, Nav } from "react-bootstrap";

import "./Campaign.css";

class Campaign extends Component {
  constructor() {
    super();
    this.state = {
      activeCampaigns: [],
      archiveCampaigns: [],
      completeCampaigns: [],
    };
  }

  componentWillMount() {
    fetch("http://10.2.135.75:5000/displayCampaign", {
      method: "GET",
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        let active = [],
          complete = [],
          archive = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i][2] === "active") {
            active.push(data[i]);
          } else if (data[i][2] === "archive") {
            archive.push(data[i]);
          } else {
            complete.push(data[i]);
          }
        }
        this.setState({
          activeCampaigns: active,
          archiveCampaigns: archive,
          completeCampaigns: complete,
        });
        console.log(this.state.activeCampaigns);
        console.log(this.state.archiveCampaigns);
        console.log(this.state.completeCampaigns);
      })
      .catch(er => {
        console.log(er);
      });
  }

  createActive = () => {
    let row = [];
    let col = [];
    let length = 0;
    
    for (let i = 0; i < this.state.activeCampaigns.length; i++) {
      col.push(
        <Col key={this.state.activeCampaigns[i][1]} sm={6} lg={4}>
          <Card className="campaigns" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={require("../../img/campaign.png")} />
            <Card.Body>
              <Card.Title>
                {this.state.activeCampaigns[i][0]}
                {this.state.activeCampaigns[i][5] === "yes" && (
                  <Badge pill variant="danger">
                    Paid
                  </Badge>
                )}
              </Card.Title>
              <Card.Subtitle>
                {this.state.activeCampaigns[i][3] === 1
                  ? "English"
                  : this.state.activeCampaigns[i][3] === 2
                  ? "Hindi"
                  : "Telugu"}
              </Card.Subtitle>
              <Card.Text>{this.state.activeCampaigns[i][7]}</Card.Text>
              <Card.Text>
                Duration : {this.state.activeCampaigns[i][8]}hrs
              </Card.Text>
              <Button variant="primary">Start Contest</Button>
            </Card.Body>
          </Card>
        </Col>
      );
      length++;
      if(length%3 === 0 || length === this.state.activeCampaigns.length)
      {
        row.push(<Row key={this.state.activeCampaigns[i][1]}>{col}</Row>);
        col=[];
      }
    }
    return row;
  };

  createArchive() {
    let row = [];
    let col = [];
    let length = 0;
    
    for (let i = 0; i < this.state.archiveCampaigns.length; i++) {
      col.push(
        <Col key={this.state.archiveCampaigns[i][1]} sm={6} lg={4}>
          <Card className="campaigns" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={require("../../img/campaign.png")} />
            <Card.Body>
              <Card.Title>
                {this.state.archiveCampaigns[i][0]}
                {this.state.archiveCampaigns[i][5] === "yes" && (
                  <Badge pill variant="danger">
                    Paid
                  </Badge>
                )}
              </Card.Title>
              <Card.Subtitle>
                {this.state.archiveCampaigns[i][3] === 1
                  ? "English"
                  : this.state.archiveCampaigns[i][3] === 2
                  ? "Hindi"
                  : "Telugu"}
              </Card.Subtitle>
              <Card.Text>{this.state.archiveCampaigns[i][7]}</Card.Text>
              <Card.Text>
                Duration : {this.state.archiveCampaigns[i][8]}hrs
              </Card.Text>
              <Button variant="primary">Start Contest</Button>
            </Card.Body>
          </Card>
        </Col>
      );
      length++;
      if(length%3 === 0 || length === this.state.archiveCampaigns.length)
      {
        row.push(<Row key={this.state.archiveCampaigns[i][1]}>{col}</Row>);
        col=[];
      }
    }
    return row;
  }

  createComplete() {
    let row = [];
    let col = [];
    let length = 0;
    
    for (let i = 0; i < this.state.completeCampaigns.length; i++) {
      col.push(
        <Col key={this.state.completeCampaigns[i][1]} sm={6} lg={4}>
          <Card className="campaigns" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={require("../../img/campaign.png")} />
            <Card.Body>
              <Card.Title>
                {this.state.completeCampaigns[i][0]}
                {this.state.completeCampaigns[i][5] === "yes" && (
                  <Badge pill variant="danger">
                    Paid
                  </Badge>
                )}
              </Card.Title>
              <Card.Subtitle>
                {this.state.completeCampaigns[i][3] === 1
                  ? "English"
                  : this.state.completeCampaigns[i][3] === 2
                  ? "Hindi"
                  : "Telugu"}
              </Card.Subtitle>
              <Card.Text>{this.state.completeCampaigns[i][7]}</Card.Text>
              <Card.Text>
                Duration : {this.state.completeCampaigns[i][8]}hrs
              </Card.Text>
              <Button variant="primary">Start Contest</Button>
            </Card.Body>
          </Card>
        </Col>
      );
      length++;
      if(length%3 === 0 || length === this.state.completeCampaigns.length)
      {
        row.push(<Row key={this.state.completeCampaigns[i][1]}>{col}</Row>);
        col=[];
      }
    }
    return row;
  }

  render() {
    return (
      <Card>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="#active">
            <Nav.Item>
              <Nav.Link href="#active">Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#upcoming">Archive</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#past">Complete</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Container className="contain-height">
          <h1 id="active" className="event-head">
            Active Campaigns
          </h1>
          {this.createActive()}
          <h1 id="upcoming" className="event-head">
            Archive Campaigns
          </h1>
          {this.createArchive()}
          <h1 id="past" className="event-head">
            Complete Campaigns
          </h1>
          {this.createComplete()}
        </Container>
      </Card>
    );
  }
}

export default Campaign;
