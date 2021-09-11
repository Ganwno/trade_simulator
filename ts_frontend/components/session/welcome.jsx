import React from 'react';
import { Link } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default () => (
    <div>
        <Container>
            <Row>
                <Col>
                    <Form>
                        <Form.Group>
                            <Link to="/login">Login</Link>
                        </Form.Group>

                        <Form.Group>
                            <Link to="/signup">Create account</Link>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>

    </div>
);
