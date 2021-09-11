import React from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default () => (
    <div>
        <Container>
            <Row>
                <Link to="/logout">Logout</Link>
            </Row>
            <Row>
                <p>Homepage</p>
            </Row>
        </Container>
    </div>
);