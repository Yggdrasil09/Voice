import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import "./Speak.css";
import Text from "../Text/Text";

class Speak extends Component {
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
          <Col xs={10} className="display">
            <Text />
          </Col>
          <Col xs={1} />
        </Row>
        <div className="review-step">
          <Container className="max-border">
            <Row className="max-border">
              <Col sm={5} xs={5} />
              <Col sm={2} xs={2}>
                <button type="button" className="video-play-button1">
                  <span />
                </button>
              </Col>
              <Col sm={5} xs={5} />
            </Row>
          </Container>
        </div>
      </Container>
    );
  }
}

export default Speak;
