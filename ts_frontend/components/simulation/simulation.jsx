import React from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Row from 'react-bootstrap/Row';

import '../../styles/simulation/simulation.css';

class Simulation extends React.Component {
    constructor(props) {
        super(props)

        const initial_cash = this.props.simulation.initial_cash;
        const tickers = this.props.simulation.security_set.split('_');

        this.state = {
            account_value: initial_cash,
            portfolio: {cash: {units: initial_cash, price: 1, market_value: initial_cash}},
            stock_tickers: tickers,
            simulation_id: this.props.simulation.id,
            simulation_time: this.props.simulation.start_time * 1000,
            // time series
            account_values: [],
            stock_prices: Object.fromEntries(tickers.map(ticker => [ticker, []]))
        }

        // bind methods
        this.startSimulation = this.startSimulation.bind(this);
        this.pauseSimulation = this.pauseSimulation.bind(this);
        this.stopSimulation = this.stopSimulation.bind(this);
        this.requestTickUpdate = this.requestTickUpdate.bind(this);
        this.receiveTickUpdate = this.receiveTickUpdate.bind(this);
    }


    startSimulation() {
        console.log('Start simulation');
    }


    pauseSimulation() {
        console.log('Puse simulation...');
    }


    stopSimulation() {
        console.log('Stop simulation');
    }


    requestTickUpdate() {
        // send request for next tick
    }


    receiveTickUpdate() {
        // update simulation time, quotes and portfolio with data from new tick

        this.setState({

        });
    }


    render() {

        return (
            <Container>
                <Row> {/* Button Group and Time */}
                <Col>
                <ButtonGroup size="lg">
                    <Button
                        id="button-start"
                        variant="success"
                        onClick={this.startSimulation}
                    >Start <span className="fas fa-play" /></Button>

                    <Button
                        id="button-pause"
                        variant="warning"
                        onClick={this.pauseSimulation}
                    >Pause <span className="fas fa-pause" /></Button>

                    <Button
                        id="button-stop"
                        variant="danger"
                        onClick={this.stopSimulation}
                    >Stop <span className="fas fa-stop" /></Button>
                </ButtonGroup>
                </Col>
                <Col>
                <Row>
                    Simulation date: {new Date(this.state.simulation_time).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                </Row>
                <Row className="time-row">
                    Time: {new Date(this.state.simulation_time).toLocaleTimeString()}
                </Row>
                </Col>
                </Row>
                <Row>
                <Col> {/* Portfolio Chart */}
                Chart                
                </Col>
                <Col> {/* Stock List */}
                Stock List
                </Col>
                </Row>
            </Container>
        );
    }

}

export default Simulation;
