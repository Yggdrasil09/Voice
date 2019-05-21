import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import './Task.css';

class TranscribeTask extends Component {
  render() {
    return (
      <Row className="border-max grid-tasks transcribe-task">
        <Col sm={6} className="task-information">
          <h1>Transcribe</h1>
          <h3>Help us recognize speech</h3>
        </Col>
        <Col sm={6} className="task-action">
          <NavLink to="/transcribe">
            <a className="transcribe-play-button" href="#top">
              <span />
            </a>
          </NavLink>
        </Col>
      </Row>
    );
  }
}

export default TranscribeTask;
