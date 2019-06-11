import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

import "./Stats.css";

class ReviewStat extends Component {
  render() {
    return (
      <Row className="stat-grid">
        <Col sm={3} className="task-action">
          
        </Col>
        <Col sm={9} />
      </Row>
    );
  }
}

export default ReviewStat;
