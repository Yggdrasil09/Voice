import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Divider, Rate, Progress } from "antd";

import TranscribeTask from "../Tasks/TranscribeTask";
import ListenTask from "../Tasks/ListenTask";
import "antd/dist/antd.css";
import "./Profile.css";

class Profile extends Component {
  render() {
    return (
      <Container className="con-border">
        <Row>
          <Col className="profile-col">
            <div className="profile" />
            <h4>User : 1234567890</h4>
            <h5 style={{display:"inline-block"}}>
              User rating : <Rate allowHalf defaultValue={2.5} disabled />
            </h5>
            <h5 style={{display:"inline-block"}}>
              Network rating : <Rate allowHalf disabled defaultValue={4.5} />
            </h5>
            <h6>Last LoggedIn : 2 days ago</h6>

            <h4 style={{display:"inline-block"}}>
              Transcribe tasks pending : <Progress type="circle" percent={75} />
            </h4>
            <h4 style={{display:"inline-block"}}>
              Review tasks pending : <Progress type="circle" percent={100} />
            </h4>
            <h5>Total tasks completed : 20</h5>
            <h5>Total money earned : Rs.120/-</h5>
          </Col>
        </Row>
        <Divider>
          <h2>Todo Tasks</h2>
        </Divider>
        <Row>
          <Col>
            <TranscribeTask />
            <ListenTask />
          </Col>
        </Row>
        <Divider>
          <h2>Completed Tasks</h2>
        </Divider>
        <Row>
          <Col>
            <ListenTask />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Profile;
