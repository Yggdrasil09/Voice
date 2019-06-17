import React, { Component } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import url from "../../url_service.js";

class CreateCampaign extends Component {
  constructor() {
    super();
    this.state = {
      campaignName: "",
      languageType: 1,
      textType: "corpus_snip",
      paid: false,
      amountForTask: null,
      limitOnTask: null,
      totalSpeak: null,
      redirect: false,
      timer: null,
      duration: null,
      campaignStatus: "active",
      description: "",
      longdescription: "",
      upload: "",
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLanguage = this.handleLanguage.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.handlePaid = this.handlePaid.bind(this);
    this.handleTextType = this.handleTextType.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.upload);
    const data = {
      p_campaign_name: this.state.campaignName,
      p_lang_id: this.state.languageType,
      p_text_type: this.state.textType,
      p_paid: this.state.paid ? "yes" : "no",
      p_limit_tasks: this.state.limitOnTask,
      p_amount: this.state.amountForTask,
      p_total_tasks_speak: this.state.totalSpeak,
      p_timer: this.state.timer,
      p_ends_in: this.state.duration,
      p_locked: 1,
      p_campaign_description_short: this.state.description,
      p_campaign_description_long: this.state.longdescription,
      p_campaign_status: this.state.campaignStatus
    };
    fetch(url + "/campaignCreate", {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        fetch(url + "/fileUpload?p_campaign_id=" + data.campaign_id, {
          method: "POST",
          body: this.state.upload
        })
          .then(res => {
            console.log(res)
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
            this.setState({
              redirect: !this.state.redirect
            });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(er => {
        console.log(er);
      });
  }

  handleUpload(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("file", this.uploadInput.files[0]);
    this.setState({
      upload: data
    });
    setTimeout(() => {
      console.log(this.state.upload.get("file"));
    }, 100);
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
    if (e.target.name === "limit-tasks") {
      this.setState({
        limitOnTask: e.target.value
      });
    }
    if (e.target.name === "speak-tasks") {
      this.setState({
        totalSpeak: e.target.value
      });
    }
    if (e.target.name === "timer") {
      this.setState({
        timer: e.target.value
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

  handleRedirect() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  }

  render() {
    return (
      <Container>
        {this.handleRedirect()}
        <Row>
          <Col>
            <div className="form-signup">
              <Form onSubmit={this.handleSubmit}>
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
                  <Form.Label>Limit on tasks</Form.Label>
                  <Form.Control
                    name="limit-tasks"
                    onChange={this.handleValueChange}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Total number of tasks in speak</Form.Label>
                  <Form.Control
                    name="speak-tasks"
                    onChange={this.handleValueChange}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Enter the timer limit in minutes</Form.Label>
                  <Form.Control
                    name="timer"
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
                <Form.Label>Upload Corpus</Form.Label>
                <div>
                  <input
                    ref={ref => {
                      this.uploadInput = ref;
                    }}
                    type="file"
                  />
                </div>
                <div>
                  <button onClick={this.handleUpload}>Upload</button>
                </div>
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

export default CreateCampaign;
