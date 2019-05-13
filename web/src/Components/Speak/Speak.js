import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
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
      textId:null,
      playing:false,
    };
    this.onStop = this.onStop.bind(this)
  }

  startRecording = () => {
    this.setState({
      record: true,
    });
  };

  play = () =>{
    document.getElementById('mic').classList.toggle("active");
    document.getElementById('pause').classList.toggle("active");
    this.state.playing?this.stopRecording():this.startRecording();
    this.setState({
      playing:!this.state.playing,
    })
  }

  stopRecording = () => {
    this.setState({
      record: false,
    });
  };

  onData(recordedBlob) {
    console.log("chunk of real-time data is: ", recordedBlob);
  }

  onStop(recordedBlob) {
    console.log("recordedBlob is: ", recordedBlob.blob);
    fetch("http://10.2.138.219:5000/getSnippetId", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({TID:this.state.textId}),
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
    fetch("http://10.2.138.219:5000/saveAudio", {
      method: "POST",
      // mode: "no-cors",
      body: recordedBlob.blob,
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
  }

  componentDidMount() {
    fetch("http://10.2.138.219:5000/showTextSnippet", {
      method: "GET",
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          text: data[0][1],
          textId:data[0][0],
        });
      })
      .catch(err => {
        console.log(err);
      });
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
        <Row>
          <Col xs={1} />
          <Col xs={10} className="display">
            <Text text={this.state.text} />
          </Col>
          <Col xs={1} />
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
                  <i id="mic" className="material-icons active">mic_none</i>
                  <i id="pause" className="material-icons active">pause</i>
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
