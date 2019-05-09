import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

class ListenTask extends Component {
  render() {
    return (
      <Row className="border-max grid-tasks listen-task">
        <Col sm={6} className="task-information">
          <h1>Listen</h1>
          <h3>Help us validate voices</h3>
        </Col>
        <Col sm={6} className="task-action">
          <NavLink to="/listen">
            <a className="video-play-button" href="#top">
              <span />
            </a>
          </NavLink>
        </Col>
      </Row>
    );
  }
}

export default ListenTask;
