import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";

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
        Hello
      </Container>
    );
  }
}

export default CampaignDescription;
