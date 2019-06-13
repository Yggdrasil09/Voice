import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

import "./Stats.css";

class ReviewStat extends Component {
  render() {
    return (
      <Row className="stat-grid">
        <Col sm={1} className="task-action">
          <i className="fas fa-play" />
        </Col>
        <Col sm={3}>
        </Col>
        <Col sm={3}></Col>
        <Col sm={3}></Col>
        <Col sm={2}></Col>
      </Row>
    );
  }
}

export default ReviewStat;
