import React from 'react';
import { Redirect } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import CreateSimulationModal from './CreateSimulationModal';

class Homepage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            createdSimulation: false,
            showCreateSimulationModal: false,
            tickersAndNames: [],
            // styles
            upColor: '#198754',   // green
            downColor: '#dc3545' // red
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

    async getTickers(route) {
        fetch(route)
            .then(response => response.text())
            .then(text => text.split('\n').map(t => Object({name: t})))
            .then(lines => {this.setState({ tickersAndNames: lines });})
    }

    formatDollarAmount(num) {
        // Return absolute value of num with $ prefix, comma separators and 2 decimal places.
        if (num === 0) { return '$0.00' }

        if (!num) { return '' }

        if (num < 0) { num = -num; }

        let numStr = '$';
        numStr += Number(num.toFixed(2)).toLocaleString();

        // ensure 2 decimal places
        const parts = numStr.split('.');
        if (parts.length == 1) {
            numStr = numStr.concat('.00');
        }
        else if (parts[1].length == 1) {
            numStr = numStr.concat('0');
        }
        return numStr
    }

    formatDateTime(timestamp) {
        return new Date(timestamp * 1000).toLocaleTimeString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    formatDate(timestamp) {
        return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    componentDidMount() {

        this.getTickers('/stock_symbols');

        const user = { username: this.props.user.username };
        this.props.getAllSimulationSummaries(user);
    }

    render() {

        // Redirect to simulation page after successful login
        if (this.state.createdSimulation) {
            return <Redirect to="/simulation" />
        }

        // Previous simulation table rows
        let simulation_summaries_table = <center>{'... Loading data ...'}</center>;
        if (this.props.simulationSummaries) {

            const simulation_table_rows = this.props.simulationSummaries.length === 0
                ? <tr key={'empty'}><td colSpan="7"><center>{'... No previous simulations ...'}</center></td></tr>
                : this.props.simulationSummaries.slice().reverse().map(s =>
                    <tr key={s.simulationSummary.created_at}>
                        <td style={{ textAlign: 'left', color: s.simulationSummary.win_loss_amount >= 0 ? this.state.upColor : this.state.downColor }}
                        >{(s.simulationSummary.win_loss_amount >= 0 ? 'Gained' : 'Lost')
                            + ' ' + this.formatDollarAmount(s.simulationSummary.win_loss_amount)}</td>
                        <td style={{ textAlign: 'left' }}>{this.formatDollarAmount(s.simulationSummary.initial_cash)}</td>
                        <td style={{ textAlign: 'left' }}>{s.simulationSummary.elapsed_time_string}</td>
                        <td style={{ textAlign: 'left' }}>{s.simulationSummary.tickers.split('_').join(', ')}</td>
                        <td style={{ textAlign: 'left' }}>{this.formatDateTime(s.simulationSummary.start_time)}</td>
                        <td style={{ textAlign: 'left' }}>{this.formatDateTime(s.simulationSummary.stopped_time)}</td>
                        <td style={{ textAlign: 'left' }}>{this.formatDate(s.simulationSummary.created_at)}</td>
                    </tr>
                );

            simulation_summaries_table = <Table
                id="simulation-summaries-table"
                responsive="true"
            >
                <thead>
                    <tr style={{ color: '#575660' }}>
                        <th style={{ textAlign: 'left' }}>Outcome</th>
                        <th style={{ textAlign: 'left' }}>Initial Cash</th>
                        <th style={{ textAlign: 'left' }}>Elapsed Time</th>
                        <th style={{ textAlign: 'left' }}>Tickers</th>
                        <th style={{ textAlign: 'left' }}>Start Time</th>
                        <th style={{ textAlign: 'left' }}>End Time</th>
                        <th style={{ textAlign: 'left' }}>Date Created</th>
                    </tr>
                </thead>
                <tbody
                    style={{ color: '#91ABBD' }}
                >
                    {simulation_table_rows}
                </tbody>
            </Table>;

        }

        return (
            <div>
                <Container>
                    <Col>
                        <Row>
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
                        <Row>
                            <center><h3>Past simulation results:</h3></center>
                            {simulation_summaries_table}
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
