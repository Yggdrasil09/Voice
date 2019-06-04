import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Card, Badge, Button, Nav, Modal } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./Campaign.css";

class Campaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCampaigns: [],
      archiveCampaigns: [],
      completeCampaigns: [],
      show: false,
      redirectLogin: false,
      redirectSpeak: false,
      redirectListen: false,
      redirectTranscribe: false,
      redirectOtpLogin : false,
      activeModalValue : [],
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleSpeak = this.handleSpeak.bind(this);
    this.handleListen = this.handleListen.bind(this);
  }

  handleClose() {
    this.setState({
      show: !this.state.show,
    });
  }

  componentWillMount() {
    fetch("http://10.2.138.28:5000/displayCampaign", {
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

  handleModal(value) {
    this.setState({
      show: !this.state.show,
      activeModalValue : value
    });
    console.log(value);
  }

  handleSpeak() {
    console.log(this.state.activeModalValue[1])
    setTimeout(()=>{
      this.state.activeModalValue[5]==="yes"?(this.setState({
        redirectOtpLogin: true
      })):(this.setState({
        redirectSpeak: true
      })); 
    },100)
    this.props.dispatch({type:"ADD_CAMPAIGN",Id : this.state.activeModalValue[1]});
    this.props.dispatch({type:"ADD_TASK",task : "speak"});
  }

  handleListen() {
    this.props.dispatch({type:"ADD_CAMPAIGN",Id : this.state.activeModalValue[1]});
    this.props.dispatch({type:"ADD_TASK",task : "listen"});
    this.state.activeModalValue[5]==="yes"?(this.setState({
      redirectLogin: true
    })):(this.setState({
      redirectListen: true
    })); 
  }

  renderRedirectOtpLogin = () => {
    if (this.state.redirectOtpLogin) {
      return <Redirect to='/otplogin' />
    }
  }

  renderRedirectLogin = () => {
    if (this.state.redirectLogin) {
      return <Redirect to='/login' />
    }
  }

  renderRedirectSpeak = () => {
    if (this.state.redirectSpeak) {
      return <Redirect to='/speak' />
    }
  }

  renderRedirectListen = () => {
    if (this.state.redirectListen) {
      return <Redirect to='/listen' />
    }
  }

  renderRedirectTranscribe = () => {
    if (this.state.redirectTranscribe) {
      return <Redirect to='/Transcribe' />
    }
  }

  createActive = () => {
    let row = [];
    let col = [];
    let length = 0;

    for (let i = 0; i < this.state.activeCampaigns.length; i++) {
      col.push(
        <Col className="campaign-col" key={this.state.activeCampaigns[i][1]} sm={6} lg={4}>
          <Card className="campaigns" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={require("../../img/campaign.png")} />
            <Card.Body>
              <Card.Title>
                {this.state.activeCampaigns[i][0] + " "}
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
                Duration : {this.state.activeCampaigns[i][8]+" "}days
              </Card.Text>
              <Button
                onClick={() => this.handleModal(this.state.activeCampaigns[i])}
                variant="primary"
              >
                Start Contest
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
      length++;
      if (length % 3 === 0 || length === this.state.activeCampaigns.length) {
        row.push(<Row className="campaign-row" key={this.state.activeCampaigns[i][1]}>{col}</Row>);
        col = [];
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
        <Col className="campaign-col" key={this.state.archiveCampaigns[i][1]} sm={6} lg={4}>
          <Card className="campaigns" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={require("../../img/campaign.png")} />
            <Card.Body>
              <Card.Title>
                {this.state.archiveCampaigns[i][0] + " "}
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
                Duration : {this.state.archiveCampaigns[i][8]+" "}days
              </Card.Text>
              <Button
                onClick={() => this.handleModal(this.state.archiveCampaigns[i])}
                variant="primary"
              >
                Start Contest
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
      length++;
      if (length % 3 === 0 || length === this.state.archiveCampaigns.length) {
        row.push(<Row className="campaign-row" key={this.state.archiveCampaigns[i][1]}>{col}</Row>);
        col = [];
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
        <Col className="campaign-col" key={this.state.completeCampaigns[i][1]} sm={6} lg={4}>
          <Card className="campaigns" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={require("../../img/campaign.png")} />
            <Card.Body>
              <Card.Title>
                {this.state.completeCampaigns[i][0] + " "}
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
                Duration : {this.state.completeCampaigns[i][8]+" "}days
              </Card.Text>
              <Button
                onClick={() => this.handleModal(this.state.completeCampaigns[i])}
                variant="primary"
              >
                Start Contest
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
      length++;
      if (length % 3 === 0 || length === this.state.completeCampaigns.length) {
        row.push(<Row className="campaign-row" key={this.state.completeCampaigns[i][1]}>{col}</Row>);
        col = [];
      }
    }
    return row;
  }

  render() {
    return (
      <Card>
        {this.renderRedirectOtpLogin()}
        {this.renderRedirectLogin()}
        {this.renderRedirectSpeak()}
        {this.renderRedirectListen()}
        {this.renderRedirectTranscribe()}
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
        <Modal centered show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton />
          <Modal.Body>Please complete the following operations</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleListen}>
              Listen/Transcribe
            </Button>
            <Button variant="primary" onClick={this.handleSpeak}>
              Speak
            </Button>
          </Modal.Footer>
        </Modal>
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

Campaign.propTypes = {
  campaignId: PropTypes.number.isRequired,
  task: PropTypes.string.isRequired,
	dispatch: PropTypes.func.isRequired
}

const mapStateToProps = function(state) {
	return {
    campaignId : state.campaignId,
    task : state.task,
    userId : state.userId,
	};
};

export default connect(mapStateToProps)(Campaign);
