import React, { Component } from 'react';
import {Container,Row,Col} from 'react-bootstrap';

import TranscribeStat from './TranscribeStat';
import ReviewStat from './ReviewStat';
import './Stats.css';

class Stats extends Component{
    render(){
        return(
            <Container className="cont-border">
                <Row>
                    <Col xs={1} sm={1}></Col>
                    <Col xs={10} sm={10}>
                        <Container className="stats-display">
                            <TranscribeStat/>
                            <ReviewStat/>
                        </Container>
                    </Col>
                    <Col xs={1} sm={1}></Col>
                </Row>
            </Container>
        )
    }
}

export default Stats;