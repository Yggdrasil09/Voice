import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Card, Icon } from "antd";

import "antd/dist/antd.css";
import "./Stats.css";

const { Meta } = Card;

class TranscribeStat extends Component {
  render() {
    return (
      <Row className="stat-grid">
        <Col sm={1} className="play-stat">
          <i className="fas fa-play" />
        </Col>
        <Col sm={3}>
          <Card
            style={{ width: "100%", marginTop: 12 }}
            actions={[
              <Icon type="check" style={{color:"green"}}/>,
              <Icon type="check" style={{color:"green"}}/>,
              <Icon type="close" style={{color:"red"}}/>
            ]}
          >
            <Meta
              style={{ height: "50%" }}
              title="Card title"
              description="This is the description"
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
              title="Card title"
              description="This is the description"
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
              title="Card title"
              description="This is the description"
            />
          </Card>
        </Col>
        <Col sm={2}></Col>
      </Row>
    );
  }
}

export default TranscribeStat;
