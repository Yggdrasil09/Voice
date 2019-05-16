import React, { Component } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBInput,
} from "mdbreact";

import "./login.css";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        fname: "",
        email: "",
        mobile: "",
        password: "",
        payment: "",
      },
      submitted: false,
    };
    this.handlefnameChange = this.handlefnameChange.bind(this);
    this.handleemailChange = this.handleemailChange.bind(this);
    this.handlemobileChange = this.handlemobileChange.bind(this);
    this.handlepasswordChange = this.handlepasswordChange.bind(this);
    this.handlepaymentChange = this.handlepaymentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.formData);
    fetch("http://10.2.135.75:5000/SignUp", {
      method: "POST",
      body: JSON.stringify(this.state.formData),
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300)
          this.setState({ submitted: true });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handlefnameChange(event) {
    this.state.formData.fname = event.target.value;
  }
  handleemailChange(event) {
    this.state.formData.email = event.target.value;
  }
  handlemobileChange(event) {
    this.state.formData.mobile = event.target.value;
  }
  handlepasswordChange(event) {
    this.state.formData.password = event.target.value;
  }
  handlepaymentChange(event) {
    this.state.formData.payment = event.target.value;
  }

  render() {
    return (
      <div className="App">
        <MDBContainer className="mb-4">
          <span className="align-middle">
            <MDBRow>
              <MDBCol md="6">
                <MDBCard>
                  <MDBCardBody>
                    <form onSubmit={this.handleSubmit}>
                      <p className="h4 text-center py-4">Sign Up</p>
                      <div className="grey-text">
                        <MDBInput
                          label="First Name"
                          icon="user"
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                          value={this.state.fname}
                          onChange={this.handlefnameChange}
                        />

                        <MDBInput
                          label="Your email"
                          icon="envelope"
                          group
                          type="email"
                          validate
                          error="wrong"
                          success="right"
                          value={this.state.email}
                          onChange={this.handleemailChange}
                        />
                        <MDBInput
                          label="Your Password"
                          icon="lock"
                          group
                          type="password"
                          value={this.state.password}
                          onChange={this.handlepasswordChange}
                        />
                        <MDBInput
                          label="Your Mobile no"
                          icon="phone"
                          value={this.state.mobile}
                          onChange={this.handlemobileChange}
                        />
                        <MDBInput
                          label="Your Payment Method"
                          icon="money-bill"
                          value={this.state.payment}
                          onChange={this.handlepaymentChange}
                        />
                      </div>
                      <div className="text-center mt-4">
                        <MDBBtn
                          color="light-blue"
                          className="mb-3"
                          type="submit"
                        >
                          Submit
                        </MDBBtn>
                      </div>
                    </form>

                    {this.state.submitted && (
                      <div>
                        <h2>You have now Signed Up.</h2>
                        This has been printed using conditional rendering.
                      </div>
                    )}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </span>
        </MDBContainer>
      </div>
    );
  }
}

export default SignUp;
