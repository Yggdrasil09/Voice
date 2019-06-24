import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

class Conversational extends Component {
  render() {
    return (
      <Row className="border-max grid-tasks speak-task">
        <Col sm={6} className="task-information">
          <h1>Conversation</h1>
          <h3>Donate your voice</h3>
        </Col>
        <Col sm={6} className="task-action">
          <NavLink to="/conversation">
            <a className="video-play-button video-play-mic" href="#top">
              <i className="material-icons">mic_none</i>
            </a>
          </NavLink>
        </Col>
      </Row>
    );
  }
}

export default Conversational;
