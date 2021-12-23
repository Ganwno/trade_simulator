import React from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

class Logout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {};

        this.logout = this.props.logoutUser.bind(this);
        this.clearAllSimulationSummaries = this.props.clearAllSimulationSummaries.bind(this);
    }

    componentDidMount(){
        this.clearAllSimulationSummaries();
    }

    render() {
        
        this.logout();

        return (
            <Container>
                <Row>
                    <div className="logout-page">
                        You have been logged out.
                    </div>
                </Row>
                <Row>
                    <Link to="/">Sign in again</Link> 
                </Row>
            </Container>
        );
    }

}

export default Logout;
