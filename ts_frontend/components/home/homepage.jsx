import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import CreateSimulationModal from './CreateSimulationModal';

class Homepage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showCreateSimulationModal: false,
            tickersAndNames: []
        }

        this.updateShowModal = this.updateShowModal.bind(this);
    };

    updateShowModal(showModal) {
        this.setState({ showCreateSimulationModal: showModal });
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
