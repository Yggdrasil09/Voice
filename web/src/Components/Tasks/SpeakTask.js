import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

class SpeakTask extends Component {
  render() {
    return (
      <Row className="border-max grid-tasks speak-task">
        <Col className="task-information">
          <h1>Speak</h1>
          <h3>Donate your voice</h3>
        </Col>
        <Col className="task-action">
          <NavLink to="/speak">
            <a id="play-video" class="video-play-button" href="#top">
              <span />
            </a>
          </NavLink>
        </Col>
      </Row>
    );
  }
}

export default SpeakTask;
