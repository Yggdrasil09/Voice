import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Card, Icon, Button, Popover} from "antd";
import { NavLink } from "react-router-dom";
import Sound from "react-sound";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Loader from 'react-loader-spinner';

import url from '../../url_service.js'
import Text from "../Text/Text";

import "antd/dist/antd.css";
import "./Stats.css";

const { Meta } = Card;

class TranscribeStat extends Component {
  constructor() {
    super();
    this.state = {
      sound: false,
      SoundFile_url: [],
      text: ["", ""],
      task_Id: ["", ""],
      AID: "",
      showModal: false,
      presentTask: [],
      response : "",
      taskno: 0,
      isLoading: false,
      noOfAudios: 0,
      array: [],
    };
    this.soundPlayer = this.soundPlayer.bind(this);
  }

  soundPlayer() {
    this.setState(state => ({
      sound: !state.sound
    }));
    document.getElementById("play").classList.toggle("active");
    document.getElementById("stop").classList.toggle("active");
  }

  componentWillMount() {
    this.setState({isLoading : true});
    fetch(url+"/showStatsJAM",
      {
        method: "POST"
      }
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        console.log(data.length);
        this.setState({
          // SoundFile_url: data[0],
          // text: data[2],
          // task_Id: data[1],
          // isLoading: false, #################################################################################
          noOfAudios: data.length,
          array : data,
        });
        console.log(this.state.noOfAudios);
      })
      .catch(err => {
        console.log(err);
      });
      for (let i = 0; i < this.state.noOfAudios; i++) {
        if (i === 0){
          this.state.presentTask.push(1);
        }
        else{
        this.state.presentTask.push(0);
        }
      }
  }

  componentDidMount() {
    for (let i = 0; i < this.state.presentTask.length; i++) {
      if (this.state.presentTask[i]) {
        document
          .getElementsByClassName("activelisten")[i].classList.toggle("active");
        document
          .getElementsByClassName("listenicon")[i].classList.toggle("active");
        document
          .getElementsByClassName("listenno")[i].classList.toggle("active");
      }
    }
  }

  handleClear(data, data2) {
    let query =
      "p_campaign_id=" + data + "&p_audio_id=" + data2;
    fetch(url+"/clearTask?"+query,
      {
        method: "POST"
      }
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  createCards = () => {
    let cards = [];
    let split_arr = [];
    for (let i = 0; i < this.state.noOfAudios; i++) {
      split_arr = this.state.array[i][0].split("_")
      let keys = split_arr[2].split(".")[0]
      if (this.state.array[i][1][i] === "Yes") {
        
      }
      cards.push(
        <Row className="stat-grid-trans">
        <Col sm={1} className="play-stat" key={keys}>
          <i className="fas fa-play play-audio-trans" />
        </Col>
        <Col sm={3}>
          <Card
            style={{ width: "100%", marginTop: 12 }}
            actions={[
              <Popover content={"Hi"} title="Title">
                <Icon type={"check"} style={{color:"green"}}/>
              </Popover>,
              <Icon type="check" style={{color:"green"}}/>,
              <Icon type="close" style={{color:"red"}}/>
            ]}
          >
            <Meta
              style={{ height: "50%",color:"red" }}
              description={this.state.array[i][1][0][1]}
              
            />
          </Card>
        </Col>
        <Col sm={3}>
          <Card
            style={{ width:"100%", marginTop: 12 }}
            actions={[
              <Icon type="check" style={{color:"green"}}/>,
              <Icon type="close" style={{color:"red"}}/>,
              <Icon type="check" style={{color:"green"}}/>
            ]}
          >
            <Meta
              style={{ height: "50%" }}
              description={this.state.array[i][1][1][1]}
            />
          </Card>
        </Col>
        <Col sm={3}>
          <Card
            style={{ width: "100%", marginTop: 12 }}
            actions={[
              <Icon type="close" style={{color:"red"}}/>,
              <Icon type="close" style={{color:"red"}}/>,
              <Icon type="check" style={{color:"green"}}/>
            ]}
          >
            <Meta
              style={{ height: "50%" }}
              description={this.state.array[i][1][2][1]}
            />
          </Card>
        </Col>
        <Col sm={2} className="button-col">
          <Button type="primary" className="button-stat" onClick={() => this.handleClear(this.state.array[i][2], keys)}>
            Clear
          </Button>
          <Button type="primary" icon="redo">
            Retake
          </Button>
        </Col>
      </Row>
      );
    }
    return cards;
  };
    
  render() {
    // if(this.state.isLoading) {
    //   return (
    //     <Container className="contain-height">
    //       <h4 id="fetching" className="center">
    //           Fetching tasks for you from the server.......
    //       </h4>
    //       <Row className="center">
    //           <Loader type="Bars" color="#D3D3D3" height="100" width="100"/>
    //       </Row>
    //     </Container>
    //   );
    // }
    return (
      // <Row className="stat-grid-trans">
      //   <Col sm={1} className="play-stat">
      //     <i className="fas fa-play play-audio-trans" />
      //   </Col>
      //   <Col sm={3}>
      //     <Card
      //       style={{ width: "100%", marginTop: 12 }}
      //       actions={[
      //         <Icon type="check" style={{color:"green"}}/>,
      //         <Icon type="check" style={{color:"green"}}/>,
      //         <Icon type="close" style={{color:"red"}}/>
      //       ]}
      //     >
      //       <Meta
      //         style={{ height: "50%" }}
      //         title="Card title"
      //         description="This is the description"
      //       />
      //     </Card>
      //   </Col>
      //   <Col sm={3}>
      //     <Card
      //       style={{ width:"100%", marginTop: 12 }}
      //       actions={[
      //         <Icon type="check" style={{color:"green"}}/>,
      //         <Icon type="close" style={{color:"red"}}/>,
      //         <Icon type="check" style={{color:"green"}}/>
      //       ]}
      //     >
      //       <Meta
      //         style={{ height: "50%" }}
      //         title="Card title"
      //         description="This is the description"
      //       />
      //     </Card>
      //   </Col>
      //   <Col sm={3}>
      //     <Card
      //       style={{ width: "100%", marginTop: 12 }}
      //       actions={[
      //         <Icon type="close" style={{color:"red"}}/>,
      //         <Icon type="close" style={{color:"red"}}/>,
      //         <Icon type="check" style={{color:"green"}}/>
      //       ]}
      //     >
      //       <Meta
      //         style={{ height: "50%" }}
      //         title="Card title"
      //         description="This is the description"
      //       />
      //     </Card>
      //   </Col>
      //   <Col sm={2} className="button-col">
      //     <Button type="primary" className="button-stat">
      //       Clear
      //     </Button>
      //     <Button type="primary" icon="redo">
      //       Retake
      //     </Button>
      //   </Col>
      // </Row>
      <Container>
      <h1 className="event-head-stats">
        Transcribe Tasks
      </h1>
      {this.createCards()}
      </Container>
    );
  }
}

export default TranscribeStat;
