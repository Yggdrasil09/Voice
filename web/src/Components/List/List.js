import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import "./List.css";

class List extends Component {
  render() {
    return (
      <Container className="border-max">
        <Row>
          <Col className="border-max">
            <Row className="text">
              <Col>
                <div className="information">
                  <h6>
                    Validating donated clips is equally important to the Voice
                    mission. Take a listen and help us create quality open
                    source voice data.
                  </h6>
                </div>
              </Col>
              <Col>
                <h1>Listen</h1>
                <h3>Help us validate voices</h3>
              </Col>
              <Col>
                <NavLink to="/listen">
                  <a id="play-video" class="video-play-button" href="#top">
                    <span />
                  </a>
                </NavLink>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default List;
