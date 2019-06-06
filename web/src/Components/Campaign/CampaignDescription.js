import React, { Component } from "react";
import Card from "react-bootstrap/Card";

import './Campaign.css'

class CampaignDescription extends Component {
  render() {
    return (
      <Card>
        <Card.Img variant="top" className="campimage" src={require("../../img/campdescription.jpg")} />
        <Card.Body>
          <Card.Text>
            Campaign Description goes here
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default CampaignDescription;
