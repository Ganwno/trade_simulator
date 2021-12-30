import React from 'react';
import { Link } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import '../../styles/nav_bar/nav_bar.css';

export default ({ currentUser, logout }) => {
    const display = (
        <Container fluid>
            <Row>
                <Col><h1>Trade Simulator</h1></Col>
                <Col className="nav-link" xs md="1">
                    <Link to="/login">Login</Link>
                </Col>
                <Col className="nav-link" xs md="2">
                    <Link to="/signup">Create account</Link>
                </Col>
            </Row>
        </Container>
    );

    return (
        <header className="logged_out_nav_bar">
            {display}
        </header>
    );
};
