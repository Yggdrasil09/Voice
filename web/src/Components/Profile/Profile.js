import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Divider, Rate, Progress } from "antd";

import TranscribeTask from "../Tasks/TranscribeTask";
import ListenTask from "../Tasks/ListenTask";
import "antd/dist/antd.css";
import "./Profile.css";

import url from "../../url_service";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      profiledata: {
        campaign_wise : [],
      }
    };
  }

  componentWillMount() {
    fetch(url + "/profilePage?user_id="+localStorage.getItem("uid"), {
      methods: "POST"
    })
    .then(res => {
      return res.json()
    })
    .then(data => {
      console.log(data)
      this.setState({
        profiledata : data,
      })
    })
    .catch(Err=>{
      console.log(Err);
    })
  }

  createTasks(){
    let tasks = [];

    for(let i=0;i < this.state.profiledata.campaign_wise.length;i++)
    {
      tasks.push(
        <TranscribeTask />,
        <ListenTask />
      )
    }

    return tasks;
  }

  render() {
    return (
      <Container className="con-border">
        <Row>
          <Col className="profile-col">
            <div className="profile" />
            <h4>User : {this.state.profiledata.name}</h4>
            <h6>Last LoggedIn : 2 days ago</h6>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5 style={{ display: "inline-block" }}>
              User rating : <Rate allowHalf defaultValue={2.5} disabled />
            </h5>
            <h4 style={{ display: "inline-block" }}>
              Transcribe tasks pending : <Progress type="circle" percent={75} />
            </h4>
          </Col>
          <Col>
            <h5 style={{ display: "inline-block" }}>
              Network rating : <Rate allowHalf disabled defaultValue={3.5} />
            </h5>
            <h4 style={{ display: "inline-block" }}>
              Review tasks pending : <Progress type="circle" percent={100} />
            </h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Total tasks completed : {this.state.profiledata.total_completed}</h5>
            <h5>Total money earned : Rs.120/-</h5>
          </Col>
        </Row>
        <Divider>
          <h2>Todo Tasks</h2>
        </Divider>
        <Row>
          <Col>
            {this.createTasks()}
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
