import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";

import "./List.css";
import ListenTask from "../Tasks/ListenTask";
import SpeakTask from "../Tasks/SpeakTask";
import TranscribeTask from "../Tasks/TranscribeTask";

class List extends Component {
  render() {
    return (
      <Container className="max-border">
        <Row>
          <h2 className="Tasks">ToDo</h2>
        </Row>
        <TranscribeTask/>
        <ListenTask />
        <SpeakTask />
        <Row>
          <h2 className="Tasks">Done</h2>
        </Row>
      </Container>
    );
  }
}

export default List;
