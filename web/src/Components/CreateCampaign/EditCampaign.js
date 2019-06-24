import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import url from "../../url_service.js";

class EditCampaign extends Component {
  constructor() {
    super();
    this.state = {
      campaignId: "",
      campaignName: "",
      languageType: 1,
      textType: "corpus_snip",
      paid: false,
      amountForTask: null,
      duration: null,
      campaignStatus: "active",
      description: "",
      longdescription: ""
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLanguage = this.handleLanguage.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.handlePaid = this.handlePaid.bind(this);
    this.handleTextType = this.handleTextType.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = {
      p_campaign_id: this.state.campaignId,
      p_campaign_name: this.state.campaignName,
      p_lang_id: this.state.languageType,
      p_text_type: this.state.textType,
      p_paid: this.state.paid ? "yes" : "no",
      p_amount: this.state.amountForTask,
      p_ends_in: this.state.duration,
      p_locked: 1,
      p_campaign_description_short: this.state.description,
      p_campaign_description_long: this.state.longdescription,
      p_campaign_status: this.state.campaignStatus
    };
    console.log(data);
    fetch(url + "/campaignEdit", {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        // this.setState({
        //   campaignName: "",
        //   languageType: 1,
        //   textType: "corpus_snip",
        //   paid: false,
        //   locked: false,
        //   amountForTask: null,
        //   limitOnTask: null,
        //   totalSpeak: null,
        //   // totalListen: null,
        //   // totalTranscribe: null,
        //   timer: null,
        //   duration: null,
        //   campaignStatus: 1,
        //   description: "",
        //   longdescription: ""
        // });
      })
      .catch(er => {
        console.log(er);
      });
  }

  handlePaid(e) {
    e.preventDefault();
    this.setState({
      paid: !this.state.paid
    });
  }

  handleLanguage(e) {
    e.preventDefault();
    this.setState({
      languageType: e.target.value
    });
  }

  handleTextType(e) {
    e.preventDefault();
    this.setState({
      textType: e.target.value
    });
  }

  handleStatus(e) {
    e.preventDefault();
    this.setState({
      campaignStatus: e.target.value
    });
  }

  handleValueChange(e) {
    e.preventDefault();
    if (e.target.name === "campaign-id") {
      this.setState({
        campaignId: e.target.value
      });
    }
    if (e.target.name === "first-name") {
      this.setState({
        campaignName: e.target.value
      });
    }
    if (e.target.name === "amount-tasks") {
      this.setState({
        amountForTask: e.target.value
      });
    }
    if (e.target.name === "duration") {
      this.setState({
        duration: e.target.value
      });
    }
    if (e.target.name === "description") {
      this.setState({
        description: e.target.value
      });
    }
    if (e.target.name === "longdescription") {
      this.setState({
        longdescription: e.target.value
      });
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <div className="form-signup">
              <h3>Edit Campaign</h3>
              <Form onSubmit={this.handleSubmit}>
                <Form.Label>Campaign Id</Form.Label>
                <Form.Control
                  placeholder="Enter Campaign Id"
                  name="campaign-id"
                  onChange={this.handleValueChange}
                />
                <Form.Label>Campaign Name</Form.Label>
                <Form.Control
                  placeholder="Enter name"
                  name="first-name"
                  onChange={this.handleValueChange}
                />
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Language</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Select Language"
                    onChange={this.handleLanguage}
                  >
                    <option value="1">English</option>
                    <option value="2">Hindi</option>
                    <option value="3">Telugu</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Text Type</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Select Language"
                    onChange={this.handleTextType}
                  >
                    <option value="corpus_snip">Corpus Snippet</option>
                    <option value="JAM">JAM</option>
                    <option value="QA">QA</option>
                  </Form.Control>
                </Form.Group>

                <Form.Check
                  type="checkbox"
                  id={`default-checkbox`}
                  label={`Paid`}
                  onChange={this.handlePaid}
                />
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Payment amount for task completion</Form.Label>
                  <Form.Control
                    name="amount-tasks"
                    onChange={this.handleValueChange}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>
                    Enter the duration of campaign in days
                  </Form.Label>
                  <Form.Control
                    name="duration"
                    onChange={this.handleValueChange}
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>A short campaign description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="2"
                    name="description"
                    onChange={this.handleValueChange}
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea2">
                  <Form.Label>Campaign Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="4"
                    name="longdescription"
                    onChange={this.handleValueChange}
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Campaign status</Form.Label>
                  <Form.Control
                    as="select"
                    name="status"
                    onChange={this.handleStatus}
                  >
                    <option value="active">Active</option>
                    <option value="archive">Archive</option>
                    <option value="complete">Complete</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default EditCampaign;
