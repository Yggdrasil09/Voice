import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Icon } from "antd";
import { NavLink } from "react-router-dom";
import { ReactMic } from "react-mic";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
      presentTask: [1, 0, 0, 0, 0],
      taskno: 0,
      blob: {},
    };
    this.onStop = this.onStop.bind(this);
    this.handleAction = this.handleAction.bind(this);
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
  
  handleAction() {
    for (let i = 0; i < this.state.presentTask.length - 1; i++) {
      let actionList = [0, 0, 0, 0, 0];
      if (this.state.presentTask[i] === 1) {
        document
          .getElementsByClassName("activespeak")[i].classList.toggle("active");
        document
          .getElementsByClassName("speakicon")[i].classList.toggle("active");
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
            .getElementsByClassName("activespeak")[i].classList.toggle("active");
          document
            .getElementsByClassName("speakicon")[i].classList.toggle("active");
          document
            .getElementsByClassName("taskno")[i].classList.toggle("active");
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
      taskno: this.state.taskno + 1,
      text: append
    });
    if (this.state.taskno === 5) {
      this.setState({
        taskno: 0,
        text: [[null, ""]],
        textId: [[null, ""]],
        presentTask: [0, 0, 0, 0, 0]                                                                                                                                                                                                                                                                                                                                                
      });
    }
  }

  componentDidMount() {
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
        data.text.push(["",""])
        this.setState({
          text: data.text,
          textId: data.text,
        });
        console.log(this.state.text);
      })
      .catch(err => {
        console.log(err);
      });
    for (let i = 0; i < this.state.presentTask.length; i++) {
      if (this.state.presentTask[i]) {
        document
          .getElementsByClassName("activespeak")[i].classList.toggle("active");
        document
          .getElementsByClassName("speakicon")[i].classList.toggle("active");
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
        <Row>
          <Col md={1} />
          <Col md={9} className="display">
            <div>
              <p>Click</p>
              <i id="mic-head" className="material-icons">
                mic_none
              </i>
              <p> then read the sentence aloud</p>
            </div>
            <Text text={this.state.text[this.state.taskno][1]} />
          </Col>
          <Col md={2}>
            <div className="no-of-tasks">
              <p>
                <span>{this.state.taskno + 1}/5</span>Clips
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
                <Icon type="play-circle" className="speak-listen" />
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
                <i
                  className="material-icons speak-send"
                  onClick={this.handleAction}
                >
                  send
                </i>
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
