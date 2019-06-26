import React, { Component } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { Icon } from "antd";
import { NavLink } from "react-router-dom";
import { ReactMic } from "react-mic";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import Loader from "react-loader-spinner";

import url from "../../url_service.js";
import "./Speak.css";
import Text from "../Text/Text";

class Speak extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      text: [[null, ""]],
      textId: [],
      playing: false,
      showModal: false,
      presentTask: [1, 0, 0, 0, 0],
      taskno: 0,
      blob: {},
      redirect: false,
      isLoading: false
    };
    this.onStop = this.onStop.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  startRecording = () => {
    this.setState({
      record: true
    });
  };

  play = () => {
    document.getElementById("mic").classList.toggle("active");
    document.getElementById("pause").classList.toggle("active");
    this.state.playing ? this.stopRecording() : this.startRecording();
    this.setState({
      playing: !this.state.playing
    });
  };

  stopRecording = () => {
    this.setState({
      record: false
    });
    // this.handleShow();
  };

  onData(recordedBlob) {
    console.log("chunk of real-time data is: ", recordedBlob);
  }

  onStop(recordedBlob) {
    console.log("recordedBlob is: ", recordedBlob.blob);
    this.setState({
      blob: recordedBlob.blob
    });
  }

  handleClose() {
    this.setState({ showModal: false });
  }

  handleShow() {
    this.setState({ showModal: true });
  }

  handleAction() {
    for (let i = 0; i < this.state.presentTask.length - 1; i++) {
      let actionList = [0, 0, 0, 0, 0];
      if (this.state.presentTask[i] === 1) {
        document
          .getElementsByClassName("activespeak")
          [i].classList.toggle("active");
        document
          .getElementsByClassName("speakicon")
          [i].classList.toggle("active");
        document.getElementsByClassName("taskno")[i].classList.toggle("active");
        actionList[i + 1] = 1;
        this.setState({
          presentTask: actionList
        });
      }
    }
    setTimeout(() => {
      for (let i = 0; i < this.state.presentTask.length; i++) {
        if (this.state.presentTask[i]) {
          document
            .getElementsByClassName("activespeak")
            [i].classList.toggle("active");
          document
            .getElementsByClassName("speakicon")
            [i].classList.toggle("active");
          document
            .getElementsByClassName("taskno")
            [i].classList.toggle("active");
        }
      }
    }, 10);
    let data = {
      p_text_id: this.state.text[this.state.taskno][0],
      p_user_id: localStorage.getItem("uid"),
      p_campaign_id: localStorage.getItem("campaignId")
    };
    let query =
      "p_campaign_id=" + data.p_campaign_id + "&p_user_id=" + data.p_user_id;
    fetch(url + "/saveAudio?p_text_id=" + data.p_text_id + "&" + query, {
      method: "POST",
      body: this.state.blob
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
    let append = this.state.text;
    append.push([1, ""]);
    this.setState({
      showModal: false,
      taskno: this.state.taskno + 1,
      text: append
    });
    if (this.state.taskno === 4) {
      this.setState({
        redirect: true,
        taskno: 0,
        text: [[null, ""]],
        textId: [[null, ""]],
        presentTask: [1, 0, 0, 0, 0]
      });
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    let data = {
      p_text_id: this.state.text[this.state.taskno][0],
      p_user_id: localStorage.getItem("uid"),
      p_campaign_id: localStorage.getItem("campaignId")
    };
    this.props.dispatch({ type: "ADD_LOGIN", falselogged: 1 });
    let query =
      "p_campaign_id=" + data.p_campaign_id + "&p_user_id=" + data.p_user_id;
    fetch(url + "/speakTasks?" + query, {
      method: "POST"
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          text: data.text,
          textId: data.text,
          isLoading: false
        });
        console.log(this.state.text);
      })
      .catch(err => {
        console.log(err);
      });
    for (let i = 0; i < this.state.presentTask.length; i++) {
      if (this.state.presentTask[i]) {
        document
          .getElementsByClassName("activespeak")
          [i].classList.toggle("active");
        document
          .getElementsByClassName("speakicon")
          [i].classList.toggle("active");
        document.getElementsByClassName("taskno")[i].classList.toggle("active");
      }
    }
  }

  handleRedirect() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Container className="contain-height">
          <h4 id="fetching" className="center">
            Fetching tasks for you from the server.......
          </h4>
          <Row className="center">
            <Loader type="Bars" color="#D3D3D3" height="100" width="100" />
          </Row>
        </Container>
      );
    }
    return (
      <Container className="max-border">
        {this.handleRedirect()}
        <div className="top-heading">
          <NavLink to="/">
            <div className="back">
              <div />
            </div>
          </NavLink>
        </div>
        <Modal show={this.state.redirect}>
          <Modal.Header closeButton>
            <Modal.Title>Task Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>You have completed all the tasks.</Modal.Body>
          <Modal.Footer />
        </Modal>
        <Modal show={this.state.showModal}>
          <Modal.Header closeButton>
            <Modal.Title>Task Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please, verify the following information</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Retake
            </Button>
            <Button variant="primary" onClick={this.handleAction}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        <Row>
          <Col md={1} />
          <Col md={9} className="display">
            <Text text={this.state.text[this.state.taskno][1]} />
          </Col>
          <Col md={2}>
            <div className="no-of-tasks">
              <p>
                <span>5/5</span>Clips
              </p>
            </div>
            <div className="taskmarking">
              <p className="activespeak active">
                <i className="material-icons speakicon active">mic_none</i>
                <div className="taskno active">1</div>
              </p>
              <p className="activespeak active">
                <i className="material-icons speakicon active">mic_none</i>
                <div className="taskno active">2</div>
              </p>
              <p className="activespeak active">
                <i className="material-icons speakicon active">mic_none</i>
                <div className="taskno active">3</div>
              </p>
              <p className="activespeak active">
                <i className="material-icons speakicon active">mic_none</i>
                <div className="taskno active">4</div>
              </p>
              <p className="activespeak active">
                <i className="material-icons speakicon active">mic_none</i>
                <div className="taskno active">5</div>
              </p>
            </div>
          </Col>
        </Row>
        <div className="review-step">
          <Container className="max-border">
            <Row className="max-border">
              <Col sm={5} xs={5}>
                  <Icon type="play-circle" className="speak-listen"/>
              </Col>
              <Col sm={2} xs={2}>
                <button
                  type="button"
                  className="video-play-button1 video-play-mic"
                  onClick={this.play}
                >
                  <i id="mic" className="material-icons active">
                    mic_none
                  </i>
                  <i id="pause" className="material-icons active">
                    pause
                  </i>
                </button>
              </Col>
              <Col sm={5} xs={5}>
                <Icon type="to-top" className="speak-send" onClick={this.handleAction}/>
              </Col>
            </Row>
          </Container>
        </div>
        <ReactMic
          record={this.state.record}
          onStop={this.onStop}
          onData={this.onData}
        />
      </Container>
    );
  }
}

Speak.propTypes = {
  falselogged: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = function(state) {
  return {
    falselogged: state.falselogged
  };
};

export default connect(mapStateToProps)(Speak);
