import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

import "./Stats.css";

class TranscribeStat extends Component {
  render() {
    return (
      <Row className="stat-grid">
        <Col sm={1} className="play-stat">
          <i className="fas fa-play"></i>
        </Col>
        <Col sm={11}></Col>
      </Row>
    );
  }
}

export default TranscribeStat;
