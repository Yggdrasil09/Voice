import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

import "./List.css";

class List extends Component {
  render() {
    return (
      <Container className="border-max">
        <Row>
          <Col className="border-max">
            <Row className="text">
              <Col>
                <h1>Listen</h1>
                <h3>Help us validate voices</h3>
              </Col>
              <Col>
                <a id="play-video" class="video-play-button" href="#top">
                  <span />
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default List;
