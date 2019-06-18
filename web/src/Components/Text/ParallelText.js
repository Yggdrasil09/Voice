import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

import "./Text.css";

class ParallelText extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col sm={6}>
            <div className="text-container-parallel">
              <h1>{this.props.text}</h1>
            </div>
          </Col>
          <Col sm={6}>
            <div className="text-container-parallel">
              <h1>{this.props.text}</h1>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ParallelText;
