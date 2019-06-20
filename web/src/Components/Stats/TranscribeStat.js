import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Card, Icon, Popover} from "antd";
import Sound from "react-sound";
import Loader from 'react-loader-spinner';
import url from '../../url_service.js';

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

  soundPlayer(value) {
    this.setState(state => ({
      SoundFile_url:value,
      sound: !state.sound,
    }));
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
          isLoading: false, 
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
        document.getElementsByClassName("activelisten")[i].classList.toggle("active");
        document.getElementsByClassName("listenicon")[i].classList.toggle("active");
        document.getElementsByClassName("listenno")[i].classList.toggle("active");
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
      let type = this.state.array[i][1][0][2][0][0] === "Yes" ? "check" : "close"
      let type1 = this.state.array[i][1][0][2][1][0] === "Yes" ? "check" : "close"
      let type2 = this.state.array[i][1][0][2][2][0] === "Yes" ? "check" : "close" 
      let type3 = this.state.array[i][1][1][2][0][0] === "Yes" ? "check" : "close"
      let type4 = this.state.array[i][1][1][2][1][0] === "Yes" ? "check" : "close"
      let type5 = this.state.array[i][1][1][2][2][0] === "Yes" ? "check" : "close" 
      let type6 = this.state.array[i][1][2][2][0][0] === "Yes" ? "check" : "close"
      let type7 = this.state.array[i][1][2][2][1][0] === "Yes" ? "check" : "close"
      let type8 = this.state.array[i][1][2][2][2][0] === "Yes" ? "check" : "close"

      let highlight = this.state.array[i][3]
      cards.push(
        <Row className="stat-grid-trans">
        <Col sm={1} className="play-stat" key={keys}>
          <i onClick={()=>{this.soundPlayer(this.state.array[i][0])}} className="fas fa-play play-audio-trans" />
        </Col>
        <Col sm={3}>
          <Card
            style={{ width: "100%", marginTop: 12, boxShadow: highlight === 0 ? "0 0 20px 1px #59CBB7" : "" }}
            actions={[
              <Popover content={"Rating : " + this.state.array[i][1][0][2][0][1]}>
                <Icon type={type} style={{color:type === "check" ? "green" : "red"}}/>
              </Popover>,
              <Popover content={"Rating : " + this.state.array[i][1][0][2][1][1]}>
                <Icon type={type1} style={{color:type1 === "check" ? "green" : "red"}}/>
              </Popover>,
              <Popover content={"Rating : " + this.state.array[i][1][0][2][2][1]}>
                <Icon type={type2} style={{color:type2 === "check" ? "green" : "red"}}/>
              </Popover>
            ]}
          >
            <Popover content = {"Confidence : " + this.state.array[i][1][0][3] + "%"}>
            <Meta
              style={{ height: "50%",color:"red" }}
              description={this.state.array[i][1][0][1]}
            />
            </Popover>
          </Card>
        </Col>
        <Col sm={3}>
          <Card
            style={{ width:"100%", marginTop: 12, boxShadow: highlight === 1 ? "0 0 20px 1px #59CBB7" : ""  }}
            actions={[
              <Popover content={"Rating : " + this.state.array[i][1][1][2][0][1]}>
                <Icon type={type3} style={{color:type3 === "check" ? "green" : "red"}}/>
              </Popover>,
              <Popover content={"Rating : " + this.state.array[i][1][1][2][1][1]}>
                <Icon type={type4} style={{color:type4 === "check" ? "green" : "red"}}/>
              </Popover>,
              <Popover content={"Rating : " + this.state.array[i][1][1][2][2][1]}>
                <Icon type={type5} style={{color:type5 === "check" ? "green" : "red"}}/>
              </Popover>
            ]}
          >
          <Popover content = {"Confidence : " + this.state.array[i][1][1][3] + "%"}>
            <Meta
              style={{ height: "50%" }}
              description={this.state.array[i][1][1][1]}
            />
          </Popover>
          </Card>
        </Col>
        <Col sm={3}>
          <Card
            style={{ width: "100%", marginTop: 12 , boxShadow: highlight === 2 ? "0 0 20px 1px #59CBB7" : "" }}// boxShadow: "0 0 20px 1px #59CBB7"}}
            actions={[
              <Popover content={"Rating : " + this.state.array[i][1][2][2][0][1]}>
                <Icon type={type6} style={{color:type6 === "check" ? "green" : "red"}}/>
              </Popover>,
              <Popover content={"Rating : " + this.state.array[i][1][2][2][1][1]}>
                <Icon type={type7} style={{color:type7 === "check" ? "green" : "red"}}/>
              </Popover>,
              <Popover content={"Rating : " + this.state.array[i][1][2][2][1][1]}>
                <Icon type={type8} style={{color:type8 === "check" ? "green" : "red"}}/>
              </Popover>
            ]}
          >
          <Popover content = {"Confidence : " + this.state.array[i][1][2][3] + "%"}>
            <Meta
              style={{ height: "50%" }}
              description={this.state.array[i][1][2][1]}
            />
          </Popover>
          </Card>
        </Col>
        <Col sm={2} className="button-col">
          {/* <Button type="primary" className="button-stat" onClick={() => this.handleClear(this.state.array[i][2], keys)}>
            Clear
          </Button> */}
          <Icon type="delete" className="delete-stat"/>
          <Icon type="redo" className="retake-stat" onClick={() => this.handleClear(this.state.array[i][2], keys)}/>
        </Col>
      </Row>
      );
    }
    return cards;
  };
    
  render() {
    if(this.state.isLoading) {
      return (
        <Container className="contain-height">
          <h1 className="event-head-stats">
            Transcription Tasks
          </h1>
          <h4 id="fetching" className="center">
              Fetching transcribe stats from the server.......
          </h4>
          <Row className="center">
              <Loader type="Bars" color="#D3D3D3" height="100" width="100"/>
          </Row>
        </Container>
      );
    }
    return (
      <Container>
      <h1 className="event-head-stats">
        Transcription Tasks
      </h1>
      {this.createCards()}
      <Sound
          url={url+"/"+this.state.SoundFile_url}
          playStatus={
            this.state.sound ? Sound.status.PLAYING : Sound.status.STOPPED
          }
          onFinishedPlaying={this.soundPlayer}
      />
      </Container>
    );
  }
}

export default TranscribeStat;
