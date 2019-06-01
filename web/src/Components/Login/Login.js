import React, { Component } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import {connect} from 'react-redux';
import PropTypes from "prop-types";

// import app from 'firebase/app';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import 'firebase/auth';
// import { connect } from 'react-firebase';

import "./Login.css";

class Login extends Component {
  firebaseConfig = {
    apiKey: "AIzaSyDvRlj9I9lSIAkp15nC4MeeyxuwQ3VklmE",
    authDomain: "my-awesome-project-1c7e2.firebaseapp.com",
    databaseURL: "https://my-awesome-project-1c7e2.firebaseio.com",
    projectId: "my-awesome-project-1c7e2",
    storageBucket: "my-awesome-project-1c7e2.appspot.com",
    messagingSenderId: "662155135167",
    appId: "1:662155135167:web:53678f3da89233d2"
  };
  constructor(props) {
    // app.initializeApp(this.firebaseConfig);
    // this.auth = app.auth();
    // var firebase = require('firebase');
    // var firebaseui = require('firebaseui');

    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.ui = this.ui.bind(this); 
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    fetch("http://10.2.135.75:5000/validateLogin", {
      method: "POST",
      body: JSON.stringify(this.state),
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          username: "",
          password: "",
        });
      })
      .catch(er => {
        console.log(er);
      });
  }

  handleValueChange(e) {
    e.preventDefault();
    if (e.target.name === "username") {
      this.setState({
        username: e.target.value,
      });
    }
    if (e.target.name === "password") {
      this.setState({
        password: e.target.value,
      });
    }
  }

  
  handleStart(e){
    var firebaseui = require('firebaseui');
    var ui = new firebaseui.auth.AuthUI(this.auth());
    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true;
        },
        uiShown: function() {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById('loader').style.display = 'none';
        }
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: 'popup',
      signInSuccessUrl: 'http://10.2.132.211:3000/tasks',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      tosUrl: '<your-tos-url>',
      // Privacy policy url.
      privacyPolicyUrl: '<your-privacy-policy-url>'
    };

    ui.start('#firebaseui-auth-container', uiConfig); 
  }
  // ui.start('#firebaseui-auth-container', {
  //   signInOptions = [
  //     {
  //       provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  //       recaptchaParameters: {
  //         type: 'image', // 'audio'
  //         size: 'normal', // 'invisible' or 'compact'
  //         badge: 'bottomleft' //' bottomright' or 'inline' applies to invisible.
  //       },
  //       defaultCountry: 'GB', // Set default country to the United Kingdom (+44).
  //       // For prefilling the national number, set defaultNationNumber.
  //       // This will only be observed if only phone Auth provider is used since
  //       // for multiple providers, the NASCAR screen will always render first
  //       // with a 'sign in with phone number' button.
  //       defaultNationalNumber: '1234567890',
  //       // You can also pass the full phone number string instead of the
  //       // 'defaultCountry' and 'defaultNationalNumber'. However, in this case,
  //       // the first country ID that matches the country code will be used to
  //       // populate the country selector. So for countries that share the same
  //       // country code, the selected country may not be the expected one.
  //       // In that case, pass the 'defaultCountry' instead to ensure the exact
  //       // country is selected. The 'defaultCountry' and 'defaultNationaNumber'
  //       // will always have higher priority than 'loginHint' which will be ignored
  //       // in their favor. In this case, the default country will be 'GB' even
  //       // though 'loginHint' specified the country code as '+1'.
  //       loginHint: '+11234567890'
  //     }
  //   ]
  // });
  



  componentDidMount(){
    console.log(this.props.campaignId)
  }

  render() {
    return (
      <Container>
        <Row>
        <script src="https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.js"></script>
        <link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.css" />
          <Col>
            <div className="form-login">
              <Form onSubmit={this.handleSubmit}>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  placeholder="Enter Username"
                  name="username"
                  onChange={this.handleValueChange}
                />
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleValueChange}
                  />
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

Login.propTypes = {
  campaignId: PropTypes.number.isRequired,
  task : PropTypes.string.isRequired,
	dispatch: PropTypes.func.isRequired
}

const mapStateToProps = function(state) {
	return {
    campaignId : state.campaignId,
    task : state.task,
    userId : state.userId,
	};
};

export default connect(mapStateToProps)(Login);
