import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";

import "./List.css";
import ListenTask from "../Tasks/ListenTask";
import TranscribeTask from "../Tasks/TranscribeTask";
import ListenParallelTask from "../Tasks/ListenParallelTask";

class ListenorTrans extends Component {
  render() {
    return (
      <Container className="max-border">
        <Row>
          <h2 className="Tasks">ToDo Tasks</h2>
        </Row>
        <TranscribeTask />
        <ListenTask />
        <ListenParallelTask/>
      </Container>
    );
  }
}

export default ListenorTrans;
