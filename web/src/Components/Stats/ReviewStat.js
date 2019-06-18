import React, { Component } from "react";
import { Row, Col, Container} from "react-bootstrap";
import Sound from "react-sound";
import { Card, Icon, Button, Popover } from "antd";
import url from '../../url_service.js'

import "antd/dist/antd.css";
import "./Stats.css";

const { Meta } = Card;

class ReviewStat extends Component {
  constructor() {
    super();
    this.state = {
      sound: false,
      SoundFile_url: "",
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
      sound: !state.sound
    }));
    // document.getElementById("play").classList.toggle("active");
    // document.getElementById("stop").classList.toggle("active");
  }

  componentWillMount() {
    this.setState({isLoading : true});
    fetch(url+"/showStats",
      {
        method: "POST"
      }
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        console.log(data[0][0]);
        this.setState({
          // text: data[2],
          // task_Id: data[1],
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

  createCards = () => {
    let cards = [];
    let split_arr = [];
    for (let i = 0; i < this.state.noOfAudios; i++) {
      split_arr = this.state.array[i][0].split("_")
      let keys = split_arr[2].split(".")[0]
      let type = this.state.array[i][2][0][0] === "Yes" ? "check" : "close"
      let type1 = this.state.array[i][2][1][0] === "Yes" ? "check" : "close"
      let type2 = this.state.array[i][2][2][0] === "Yes" ? "check" : "close"
      let style = this.state.array[i][2][0][0] === "Yes" ? "green" : "red"
      let style1 = this.state.array[i][2][1][0] === "Yes" ? "green" : "red"
      let style2 = this.state.array[i][2][2][0] === "Yes" ? "green" : "red"
      cards.push(
        <Row className="stat-grid-review">
        <Col sm={1} className="task-action" key={keys}>
          <i onClick={()=>{this.soundPlayer(this.state.array[i][0])}} className="fas fa-play play-audio" />
        </Col>
        <Col sm={9}>
        <Popover placement="bottomRight" content={"Confidence : " + this.state.array[i][4] + "%"}>
        <Card
            style={{ width: "100%", marginTop: 12 }}
            actions={[
              <Popover placement="bottom" content={"Rating : " + this.state.array[i][2][0][1]}>
              <Icon type={type} style={{color:style}} />
              </Popover>,
              <Popover placement="bottom" content={"Rating : " + this.state.array[i][2][1][1]}>
              <Icon type={type1} style={{color:style1}} />
              </Popover>,
              <Popover placement="bottom" content={"Rating : " + this.state.array[i][2][2][1]}>
              <Icon type={type2} style={{color:style2}} />
              </Popover>
            ]}
          >
            <Meta
              style={{ height: "50%" }}
              title={this.state.array[i][1]}
            />
            </Card>
        </Popover>
        </Col>
        <Col sm={2} className="button-col">
          <Icon type="delete" className="delete-stat"/>
          <Icon type="redo" className="retake-stat"/>
        </Col>
      </Row>
      );
    }
    return cards;
  };

  render() {
    return (
      <Container>
      <h1 className="event-head-stats">
        Review Tasks
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

export default ReviewStat;
