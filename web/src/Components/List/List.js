import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

import "./List.css";
import ListenTask from '../Tasks/ListenTask';
import SpeakTask from '../Tasks/SpeakTask';

class List extends Component {
  render() {
    return (
      <Container className="max-border">
        <Row>
          <h2>ToDo</h2>
        </Row>
        <ListenTask/>
        <SpeakTask/>
        <Row>
          <h2>Done</h2>
        </Row>
      </Container>
    );
  }
}

export default List;
