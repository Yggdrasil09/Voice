import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import Loader from "react-loader-spinner";
import { Button } from "antd";
import { Redirect } from "react-router";

import "./Text.css";

class Text extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      assignTasks: false,
      returnhome: false
    };
    this.handleRedirectNewtasks = this.handleRedirectNewtasks.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
  }

  handleRedirectNewtasks() {
    if (this.state.assignTasks) {
      return <Redirect to="/speak" />;
    }
  }

  handleReturn() {
    if (this.state.returnhome) {
      return <Redirect to="/" />;
    }
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
  }

  render() {
    return (
      <div className="text-container">
        {this.handleReturn()}
        {this.handleRedirectNewtasks()}
        <h1>
          {this.props.text === "end" ? (
            <Container className="contain-height">
              <h4 className="center">You have completed the task.</h4>
              <Row className="center-speak">
                <Button
                  type="primary"
                  onClick={() => {
                    this.setState({
                      returnhome: true
                    });
                  }}
                >
                  Return
                </Button>
              </Row>
              <Row className="center-speak">
                <Button
                  type="primary"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Allot new tasks
                </Button>
              </Row>
            </Container>
          ) : this.props.text === "" ? (
            <Container className="contain-height">
              <h4 id="fetching" className="center">
                Fetching tasks for you from the server.......
              </h4>
              <Row className="center">
                <Loader type="Bars" color="#D3D3D3" height="100" width="100" />
              </Row>
            </Container>
          ) : (
            this.props.text
          )}
        </h1>
      </div>
    );
  }
}

export default Text;
