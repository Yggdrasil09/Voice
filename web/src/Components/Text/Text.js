import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import Loader from "react-loader-spinner";

import "./Text.css";

class Text extends Component {
  constructor() {
    super();
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
  }

  render() {
    return (
      <div className="text-container">
        <h1>
          {this.props.text === "" ? (
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
