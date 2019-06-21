import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Drawer } from "antd";

import "./Speak.css";
import Text from "../Text/Text";

class ConversationSpeak extends Component {
  render() {
    return (
      <Container className="max-border">
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          visible={true}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
        <div className="top-heading">
          <NavLink to="/">
            <div className="back">
              <div />
            </div>
          </NavLink>
        </div>
        <Row>
          <Col md={2} />
          <Col md={8} className="display">
            <Text text="hello" />
          </Col>
          <Col md={2} />
        </Row>
        <div className="review-step">
          <Container className="max-border">
            <Row className="max-border">
              <Col sm={5} xs={5} />
              <Col sm={2} xs={2}>
                <button
                  type="button"
                  className="video-play-button1 video-play-mic"
                  onClick={this.play}
                >
                  <i id="mic" className="material-icons active">
                    phone
                  </i>
                  <i id="pause" className="material-icons active">
                    phone_paused
                  </i>
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

export default ConversationSpeak;
