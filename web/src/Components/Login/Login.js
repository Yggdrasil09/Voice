import React, { Component } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBInput,
} from "mdbreact";
import { Redirect } from "react-router-dom";

import "./login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        email: "",
        password: "",
      },
      submitted: false,
      redirect: false,
    };
    this.handleemailChange = this.handleemailChange.bind(this);
    this.handlepasswordChange = this.handlepasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch("http://10.2.135.75:5000/validateLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.formData),
    })
      .then(response => {
        // if (response.status >= 200 && response.status < 300)
        //   this.setState({ submitted: true });
        return response.json();
      })
      .then(data => {
        if (data.message == "login sucessfull") {
          this.setState({
            redirect: true,
          });
        }
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleemailChange(event) {
    this.state.formData.email = event.target.value;
  }
  handlepasswordChange(event) {
    this.state.formData.password = event.target.value;
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };

  render() {
    return (
      <div className="App1">
        {this.renderRedirect()}
        <MDBContainer className="mb-4">
          <span className="align-middle">
            <MDBRow>
              <MDBCol md="5">
                <MDBCard>
                  <MDBCardBody>
                    <h4 className="mt-3">
                      <p className="text-center">
                        {" "}
                        <MDBIcon icon="lock"> Login</MDBIcon>
                      </p>
                    </h4>
                    <form onSubmit={this.handleSubmit}>
                      <div className="grey-text">
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
                          validate
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
                        <h2>Login.</h2>
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

export default Login;
