import React from 'react';
import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';
import LogoutContainer from './session/logout_container';
import { Route, Link } from 'react-router-dom';

// React-Boostrap components
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
//import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

export default () => (
    <div>
        <Route path="/signup" component={SignupContainer} />
        <Route path="/login" component={LoginContainer} />
        <Route path="/logout" component={LogoutContainer} />

        <Container>
            <Row>
                <Link to="/logout">Logout</Link>
            </Row>    
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
