import React, { Component } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { ReactMic } from "react-mic";

import "./Speak.css";
import Text from "../Text/Text";

class Speak extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      text: "",
      textId: null,
      playing: false,
      showModal: false,
      presentTask: [1, 0, 0, 0, 0],
    };
    this.onStop = this.onStop.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAction = this.handleAction.bind(this);
  }

  startRecording = () => {
    this.setState({
      record: true,
    });
  };

  play = () => {
    document.getElementById("mic").classList.toggle("active");
    document.getElementById("pause").classList.toggle("active");
    this.state.playing ? this.stopRecording() : this.startRecording();
    this.setState({
      playing: !this.state.playing,
    });
  };

  stopRecording = () => {
    this.setState({
      record: false,
    });
    this.handleShow();
  };

  onData(recordedBlob) {
    console.log("chunk of real-time data is: ", recordedBlob);
  }

  onStop(recordedBlob) {
    // console.log("recordedBlob is: ", recordedBlob.blob);
    // fetch("http://10.2.135.75:5000/getSnippetId", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ TID: this.state.textId }),
    // })
    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // fetch("http://10.2.135.75:5000/saveAudio", {
    //   method: "POST",
    //   // mode: "no-cors",
    //   body: recordedBlob.blob,
    // })
    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
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
        document.getElementsByClassName("activespeak")[i].classList.toggle("active");
        document.getElementsByClassName("speakicon")[i].classList.toggle("active");
        document.getElementsByClassName("taskno")[i].classList.toggle("active");
        actionList[i + 1] = 1;
        this.setState({
          presentTask: actionList,
        });
      }
    }
    setTimeout(() => {
      for (let i = 0; i < this.state.presentTask.length; i++) {
        if (this.state.presentTask[i]) {
          document.getElementsByClassName("activespeak")[i].classList.toggle("active");
          document.getElementsByClassName("speakicon")[i].classList.toggle("active");
          document.getElementsByClassName("taskno")[i].classList.toggle("active");
        }
      }
    }, 100);
    this.setState({ showModal: false });
  }

  componentDidMount() {
    // fetch("http://10.2.135.75:5000/displayText", {
    //   method: "GET",
    // })
    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(data => {
    //     console.log(data);
    //     this.setState({
    //       text: data[0][1],
    //       textId: data[0][0],
    //     });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    for (let i = 0; i < this.state.presentTask.length; i++) {
      if (this.state.presentTask[i]) {
        document.getElementsByClassName("activespeak")[i].classList.toggle("active");
        document.getElementsByClassName("speakicon")[i].classList.toggle("active");
        document.getElementsByClassName("taskno")[i].classList.toggle("active");
      }
    }
  }

  render() {
    return (
      <Container className="max-border">
        <div className="top-heading">
          <NavLink to="/">
            <div className="back">
              <div />
            </div>
          </NavLink>
        </div>
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
          <Col xs={1} />
          <Col xs={9} className="display">
            <Text text={this.state.text} />
          </Col>
          <Col xs={2}>
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
              <Col sm={5} xs={5} />
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
              <Col sm={5} xs={5} />
            </Row>
          </Container>
        </div>
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          onData={this.onData}
          strokeColor="#000000"
          backgroundColor="#224071"
        />
        <button onClick={this.startRecording} type="button">
          Start
        </button>
        <button onClick={this.stopRecording} type="button">
          Stop
        </button>
      </Container>
    );
  }
}

export default Speak;
