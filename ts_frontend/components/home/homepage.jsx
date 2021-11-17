import React from 'react';
import { Redirect } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import CreateSimulationModal from './CreateSimulationModal';

class Homepage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            createdSimulation: false,
            showCreateSimulationModal: false,
            tickersAndNames: []
        }

        this.updateShowModal = this.updateShowModal.bind(this);
        this.updateCreatedSimulation = this.updateCreatedSimulation.bind(this);
    };

    updateShowModal(showModal) {
        this.setState({ showCreateSimulationModal: showModal });
    }

    updateCreatedSimulation(createdSimulation) {
        this.setState({ createdSimulation: createdSimulation });
    }

    getTickers = async (route) => {
        fetch(route)
            .then(response => response.text())
            .then(text => text.split('\n').map(t => Object({name: t})))
            .then(lines => {this.setState({ tickersAndNames: lines });})
    }

    componentDidMount() {

        this.getTickers('/stock_symbols');
    }

    render() {

        // Redirect to simulation page after successful login
        if (this.state.createdSimulation) {
            return <Redirect to="/simulation" />
        }

        return (
            <div>
                <Container>
                    <Col>
                        <Row>
                            <p>Homepage</p>

                            <Col>
                                <Button
                                    className="button-submit"
                                    onClick={() => this.setState({ showCreateSimulationModal: true })}
                                    type="submit"
                                >New Simulation</Button>
                                <CreateSimulationModal
                                    showModal={this.state.showCreateSimulationModal}
                                    onShowModalChange={this.updateShowModal}
                                    tickersAndNames={this.state.tickersAndNames}
                                    user={this.props.user}
                                    createNewSimulation={this.props.createNewSimulation}
                                    updateCreatedSimulation={this.updateCreatedSimulation}
                                />
                            </Col>

                        </Row>
                    </Col>

                    <Col>

                    </Col>
                </Container>
            </div>
        );
    }

}

export default Homepage;
