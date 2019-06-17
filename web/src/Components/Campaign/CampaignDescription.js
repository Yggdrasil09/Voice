import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Divider } from "antd";
import { Badge } from 'react-bootstrap';

import "antd/dist/antd.css";
import url from "../../url_service";
import "./Campaign.css";

class CampaignDescription extends Component {
  constructor() {
    super();
    this.state = {
      list: []
    };
  }

  componentWillMount() {
    let data = {
      p_campaign_id: localStorage.getItem("campaignId")
    };
    fetch(url + "/campaignDetails?p_campaign_id=" + data.p_campaign_id, {
      method: "POST"
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          list: data
        });
        console.log(this.state.list);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <Container className="con-border">
        <Row>
          <Col md={8} className="description-col">
            <img
              src={require("../../img/speakingcampaign.jpg")}
              alt="campaign"
              className="campaignspeakdesp"
            />
          </Col>
          <Col md={4} className="campdesc">
            <h2 className="camptitle">Camapaign Name <Badge style={{fontSize:"1.5rem"}} pill variant="danger">Paid</Badge></h2>   
            <h3 className="campsubtitle">Campaign Subtitle</h3>
            <h4>Campaign Short Description</h4>
            <h4>Campaign Duration</h4>
          </Col>
        </Row>
        <Divider><h3>About the campaign</h3></Divider>
        <Row>
          <Col>
            Here goes the large description of the campaign
          </Col>
        </Row>
        <Divider><h3>Register</h3></Divider>
        <Row>
          <Col>
            Otp Login comes here
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CampaignDescription;
