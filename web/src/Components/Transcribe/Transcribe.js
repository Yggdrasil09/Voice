import React, { Component } from "react";
import { Container, Row, Col, Form, Modal, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Sound from "react-sound";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import url from "../../url_service.js";
import "./Transcribe.css";

class Transcribe extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      sound: false,
      SoundFile_url: [],
      task_Id: [],
      AID: "",
      showModal: false,
      // sound_files : [],
      presentTask: [1, 0, 0, 0, 0],
      taskno: 0
    };
    this.soundPlayer = this.soundPlayer.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleValueChange(e) {
    e.preventDefault();
    this.setState({
      text: e.target.value
    });
  }

  soundPlayer() {
    this.setState(state => ({
      sound: !state.sound
    }));
    document.getElementById("play").classList.toggle("active");
    document.getElementById("stop").classList.toggle("active");
  }

  handleAction() {
    let data = {
      p_response: this.state.text,
      p_task_id: this.state.task_Id[this.state.taskno]
    };
    fetch(url + "/saveResponse", {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    for (let i = 0; i < this.state.presentTask.length - 1; i++) {
      let actionList = [0, 0, 0, 0, 0];
      if (this.state.presentTask[i] === 1) {
        document
          .getElementsByClassName("activelisten")[i].classList.toggle("active");
        document
          .getElementsByClassName("listenicon")[i].classList.toggle("active");
        document
          .getElementsByClassName("listenno")[i].classList.toggle("active");
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
            .getElementsByClassName("activelisten")[i].classList.toggle("active");
          document
            .getElementsByClassName("listenicon")[i].classList.toggle("active");
          document
            .getElementsByClassName("listenno")[i].classList.toggle("active");
        }
      }
    }, 100);

    this.setState({
      showModal: false,
      taskno: this.state.taskno + 1,
      text: ""
    });
  }

  handleClose() {
    this.setState({ showModal: false });
  }

  handleShow() {
    this.setState({ showModal: true });
  }

  handleSubmit() {
    this.handleShow();
  }

  componentWillMount() {
    let data = {
      p_campaign_id: localStorage.getItem("campaignId"),
      p_user_id: localStorage.getItem("uid")
    };
    let query = "p_campaign_id="+data.p_campaign_id+"&p_user_id="+data.p_user_id;
    fetch(url + "/allotTranscribeTasks?"+query, {
      method: "POST"
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        fetch(url + "/sendAudioPath_transcribe?"+query,{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => {
            return res.json();
          })
          .then(data => {
            console.log(data);
            this.setState({
              SoundFile_url: data[0],
              task_Id: data[1]
            });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.props.dispatch({type:"ADD_LOGIN",falselogged : 1});
    for (let i = 0; i < this.state.presentTask.length; i++) {
      if (this.state.presentTask[i]) {
        document
          .getElementsByClassName("activelisten")[i].classList.toggle("active");
        document
          .getElementsByClassName("listenicon")[i].classList.toggle("active");
        document
          .getElementsByClassName("listenno")[i].classList.toggle("active");
        // this.setState({
        //   SoundFile_url :"http://10.2.135.75:5000/" + this.state.sound_files[i],
        // })
        console.log(this.state.SoundFile_url);
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
          <Col md={1} />
          <Col md={9} className="display">
            <button
              type="button"
              onClick={this.soundPlayer}
              className="video-play-button2 transcribe-button"
            >
              <span id="play" className="play-toggle active" />
              <div id="stop" className="stop active" />
            </button>
            <div className="textclick">
              <p>Click</p>
              <svg className="play-now" viewBox="0 0 13 15">
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g id="icon-/-play" fill="#B7D43F">
                    <path
                      d="M0.978009259,0 C1.03819475,0 1.09587164,0.00733847847 1.15104167,0.0220156556 C1.2062117,0.0366928327 1.2613809,0.0538159491 1.31655093,0.0733855186 C1.37172095,0.0929550881 1.42438247,0.117416683 1.47453704,0.146771037 L12.5486111,6.7074364 C12.6388893,6.75636032 12.7191355,6.82240663 12.7893519,6.9055773 C12.8595683,6.98874797 12.9122298,7.08170203 12.947338,7.18444227 C12.9824462,7.28718251 13,7.39236737 13,7.5 C13,7.85225225 12.8495385,8.11643748 12.5486111,8.2925636 L1.45949074,14.853229 C1.38927434,14.9021529 1.31153592,14.9388453 1.22627315,14.9633072 C1.14101038,14.9877692 1.05324119,15 0.962962963,15 C0.882715648,15 0.802469537,14.9902154 0.722222222,14.9706458 C0.641974907,14.9510762 0.566744178,14.9217223 0.496527778,14.8825832 C0.165507604,14.6966723 0,14.4227024 0,14.0606654 L0.0150462963,0.939334638 C0.0150462963,0.577297603 0.1805539,0.30332774 0.511574074,0.11741683 C0.652006875,0.0391385519 0.807483715,0 0.978009259,0 Z"
                      id="play-button"
                    />
                  </g>
                </g>
              </svg>
              <p>, Transcribe the speech to text</p>
            </div>
            <div className="text-container">
              <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Control
                    as="textarea"
                    placeholder="Enter transcribed text here ..."
                    className="textinput"
                    onChange={this.handleValueChange}
                    value={this.state.text}
                  />
                </Form.Group>
              </Form>
            </div>
          </Col>
          <Col md={2}>
            <div className="no-of-tasks">
              <p>
                <span>5/5</span>Clips
              </p>
            </div>
            <div className="taskmarking">
              <p className="activelisten active">
                <i class="far fa-keyboard listenicon active"></i>
                <div className="listenno active">1</div>
              </p>
              <p className="activelisten active">
                <i class="far fa-keyboard listenicon active"></i>
                <div className="listenno active">2</div>
              </p>
              <p className="activelisten active">
                <i class="far fa-keyboard listenicon active"></i>
                <div className="listenno active">3</div>
              </p>
              <p className="activelisten active">
                <i class="far fa-keyboard listenicon active"></i>
                <div className="listenno active">4</div>
              </p>
              <p className="activelisten active">
                <i class="far fa-keyboard listenicon active"></i>
                <div className="listenno active">5</div>
              </p>
            </div>
          </Col>
        </Row>
        <div className="review-step">
          <Container className="max-border">
            <Row className="max-border">
              <Col sm={5} xs={5} />
              <Col sm={2} xs={2}>
                <div className="submit" onClick={this.handleSubmit}>
                  <h5>Submit</h5>
                </div>
              </Col>
              <Col sm={5} xs={5} />
            </Row>
          </Container>
        </div>
        <Sound
          url={url + "/" + this.state.SoundFile_url[this.state.taskno]}
          playStatus={
            this.state.sound ? Sound.status.PLAYING : Sound.status.STOPPED
          }
          onFinishedPlaying={this.soundPlayer}
        />
      </Container>
    );
  }
}

Transcribe.propTypes = {
  falselogged: PropTypes.number.isRequired,
	dispatch: PropTypes.func.isRequired
}


const mapStateToProps = function(state) {
	return {
    falselogged : state.falselogged,
	};
};

export default connect(mapStateToProps)(Transcribe);
