import React, { Component } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Sound from "react-sound";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import "./Transcribe.css";

class Transcribe extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      sound: false,
      SoundFile_url: "",
    };
    this.soundPlayer = this.soundPlayer.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleValueChange(e) {
    e.preventDefault();
    this.setState({
      text: e.target.value,
    });
  }

  soundPlayer() {
    this.setState(state => ({
      sound: !state.sound,
    }));
    document.getElementById("play").classList.toggle("active");
    document.getElementById("stop").classList.toggle("active");
  }

  componentWillqMount() {
    let data = {
      p_campaign_id : 1,
      p_user_id : 1,
    }
    fetch("http://10.2.138.219:5000/speakTasks", {
      method: "POST",
      body : JSON.stringify(data)
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
          <Col xs={9} className="display">
            <div>
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
                  />
                </Form.Group>
              </Form>
            </div>

            <div className="review-step">
              <Container className="max-border">
                <Row className="max-border">
                  <Col sm={5} xs={5}>
                    <div className="submit" onClick={this.sendResponseYes}>
                      <h5>Submit</h5>
                    </div>
                  </Col>
                  <Col sm={2} xs={2}>
                    <button
                      type="button"
                      onClick={this.soundPlayer}
                      className="video-play-button2"
                    >
                      <span id="play" className="play-toggle active" />
                      <div id="stop" className="stop active" />
                    </button>
                  </Col>
                  <Col sm={5} xs={5} />
                </Row>
              </Container>
            </div>
          </Col>
          <Col xs={2}>
            <div className="no-of-tasks">
              <p>
                <span>5/5</span>Clips
              </p>
            </div>
            <div className="taskmarking">
              <p className="activelisten active">
                <i class="fas fa-assistive-listening-systems listenicon active" />
                <div className="listenno active">1</div>
              </p>
              <p className="activelisten active">
                <i class="fas fa-assistive-listening-systems listenicon active" />
                <div className="listenno active">2</div>
              </p>
              <p className="activelisten active">
                <i class="fas fa-assistive-listening-systems listenicon active" />
                <div className="listenno active">3</div>
              </p>
              <p className="activelisten active">
                <i class="fas fa-assistive-listening-systems listenicon active" />
                <div className="listenno active">4</div>
              </p>
              <p className="activelisten active">
                <i class="fas fa-assistive-listening-systems listenicon active" />
                <div className="listenno active">5</div>
              </p>
            </div>
          </Col>
        </Row>
        <Sound
          url={this.state.SoundFile_url}
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
  campaignId: PropTypes.number.isRequired,
  userId : PropTypes.number.isRequired,
	dispatch: PropTypes.func.isRequired
}

const mapStateToProps = function(state) {
	return {
    campaignId : state.campaignId,
    userId : state.userId,
	};
};

export default connect(mapStateToProps)(Transcribe);
