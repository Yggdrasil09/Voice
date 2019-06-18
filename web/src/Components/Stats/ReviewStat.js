import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Card, Icon, Button ,Popover} from "antd";

import "antd/dist/antd.css";
import "./Stats.css";

const { Meta } = Card;

class ReviewStat extends Component {
  render() {
    return (
      <Row className="stat-grid-review">
        <Col sm={1} className="task-action">
          <i className="fas fa-play play-audio" />
        </Col>
        <Col sm={9}>
          <Card
            style={{ width: "100%", marginTop: 12 }}
            actions={[
              <Popover placement="bottom" content="hello">
                <Icon type="check" style={{ color: "green" }} />
              </Popover>
              ,
              <Icon type="check" style={{ color: "green" }} />,
              <Icon type="close" style={{ color: "red" }} />
            ]}
          >
            <Meta
              style={{ height: "50%" }}
              title="Card title"
              description="This is the description"
            />
          </Card>
        </Col>
        <Col sm={2} className="button-col">
          <Button type="primary" className="button-stat">
            Clear
          </Button>
          <Button type="primary" icon="redo">
            Retake
          </Button>
        </Col>
      </Row>
    );
  }
}

export default ReviewStat;
