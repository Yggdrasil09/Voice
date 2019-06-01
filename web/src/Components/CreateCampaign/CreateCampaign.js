import React, { Component } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";

class CreateCampaign extends Component {
  constructor() {
    super();
    this.state = {
      campaignName: "",
      languageType: 1,
      textType: "corpus_snip",
      paid: false,
      locked: false,
      amountForTask: null,
      limitOnTask: null,
      totalSpeak: null,
      // totalListen: null,
      // totalTranscribe: null,
      timer: null,
      duration: null,
      campaignStatus: "active",
      description: "",
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLanguage = this.handleLanguage.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.handlePaid = this.handlePaid.bind(this);
    this.handleLocked = this.handleLocked.bind(this);
    this.handleTextType = this.handleTextType.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    const data = {
      p_campaign_name: this.state.campaignName,
      p_lang_id: this.state.languageType,
      p_text_type: this.state.textType,
      p_paid: this.state.paid ? "yes" : "no",
      p_limit_tasks: this.state.limitOnTask,
      p_amount: this.state.amountForTask,
      p_total_tasks_speak: this.state.totalSpeak,
      // p_total_tasks_listen: this.state.totalListen,
      // p_total_tasks_transcribe: this.state.totalTranscribe,
      p_timer: this.state.timer,
      p_ends_in: this.state.duration,
      p_locked: this.state.locked ? 1 : 0,
      p_campaign_description: this.state.description,
      p_campaign_status: this.state.campaignStatus,
    };
    fetch("http://10.2.135.75:5000/campaignCreate", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(res => {
        console.log(res);
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
        // });
        // this.renderRedirectCampaignCreated()
      })
      .catch(er => {
        console.log(er);
      });
  }

  // renderRedirectCampaignCreated = () => {
  //   // if (this.state.redirectSpeak) {
  //     return <Redirect to='/' />
  //   // }
  // }

  handlePaid(e) {
    e.preventDefault();
    this.setState({
      paid: !this.state.paid,
    });
  }

  handleLocked(e) {
    e.preventDefault();
    this.setState({
      locked: !this.state.locked,
    });
  }

  handleLanguage(e) {
    e.preventDefault();
    this.setState({
      languageType: e.target.value,
    });
  }

  handleTextType(e) {
    e.preventDefault();
    this.setState({
      textType: e.target.value,
    });
  }

  handleStatus(e) {
    e.preventDefault();
    this.setState({
      campaignStatus: e.target.value,
    });
  }

  handleValueChange(e) {
    e.preventDefault();
    if (e.target.name === "first-name") {
      this.setState({
        campaignName: e.target.value,
      });
    }
    if (e.target.name === "amount-tasks") {
      this.setState({
        amountForTask: e.target.value,
      });
    }
    if (e.target.name === "limit-tasks") {
      this.setState({
        limitOnTask: e.target.value,
      });
    }
    if (e.target.name === "speak-tasks") {
      this.setState({
        totalSpeak: e.target.value,
      });
    }
    // if (e.target.name === "listen-tasks") {
    //   this.setState({
    //     totalListen: e.target.value,
    //   });
    // }
    // if (e.target.name === "transcribe-tasks") {
    //   this.setState({
    //     totalTranscribe: e.target.value,
    //   });
    // }
    if (e.target.name === "timer") {
      this.setState({
        timer: e.target.value,
      });
    }
    if (e.target.name === "duration") {
      this.setState({
        duration: e.target.value,
      });
    }
    if (e.target.name === "description") {
      this.setState({
        description: e.target.value,
      });
    }
  }

  render() {
    return (
      <Container>
        {/* {this.renderRedirectCampaignCreated()} */}
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
                  <Form.Label>Language Type</Form.Label>
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
                <Form.Check
                  type="checkbox"
                  id={`default-checkbox`}
                  label={`Locked`}
                  onChange={this.handleLocked}
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
                {/* <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Total number of tasks in listen</Form.Label>
                  <Form.Control
                    name="listen-tasks"
                    onChange={this.handleValueChange}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Total number of tasks in transcribe</Form.Label>
                  <Form.Control
                    name="transcribe-tasks"
                    onChange={this.handleValueChange}
                  />
                </Form.Group> */}
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
                  <Form.Label>Campaign Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    name="description"
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

export default CreateCampaign;
