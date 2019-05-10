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
    };
  }

  startRecording = () => {
    this.setState({
      record: true,
    });
  };

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
    fetch("http://10.2.132.211:5000/test", {
      method: "POST",
      mode: "no-cors",
      body:recordedBlob.blob
    }).then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount()
  {
    fetch('http://10.2.132.211:5000/test1',{
      method:"GET",
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode:'no-cors',
    }).then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })
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
            <Text />
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
                >
                  <i className="material-icons">mic_none</i>
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
