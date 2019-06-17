import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Divider, Rate, Progress} from "antd";

import "antd/dist/antd.css";
import "./Profile.css";

class Profile extends Component {
  render() {
    return (
      <Container className="con-border">
        <Row>
          <Col sm={5} className="profile-col">
            <div className="profile" />
            <h4>User : 1234567890</h4>
            <h5>Transcribe rating : <Rate allowHalf defaultValue={2.5} disabled/></h5>
            <h5>Review rating : <Rate allowHalf disabled defaultValue={4.5}/></h5>
            <h6>Last LoggedIn : 2 days ago</h6>
          </Col>
          <Col sm={7} className="status-col">
            <h4>Transcribe tasks pending : <Progress type="circle" percent={75} /></h4>
            <h4>Review tasks pending : <Progress type="circle" percent={100} /></h4>
            <h5>Total tasks completed : 20</h5>
          </Col>
        </Row>
        <Divider>
          <h2>Todo Tasks</h2>
        </Divider>
        <Row>
          <Col>
            <h3>Here goes the todo task list</h3>
          </Col>
        </Row>
        <Divider>
          <h2>Completed Tasks</h2>
        </Divider>
        <Row>
          <Col>
            <h3>Here goes the tasks which are completed</h3>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Profile;
