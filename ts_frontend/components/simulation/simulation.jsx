import React from 'react';
import { Redirect } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import {List, arrayMove} from 'react-movable';
import '../../styles/simulation/simulation.css';

// trade actions
const BUY = 'BUY';
const SELL = 'SELL';

class Simulation extends React.Component {
    constructor(props) {
        super(props)

        const initial_cash = this.props.simulation.initial_cash;
        const tickers = this.props.simulation.security_set.split('_');
        const pre_open_points = 0;

        this.state = {
            account_value: initial_cash,
            portfolio: { cash: { units: initial_cash, market_value: initial_cash }},
            portfolio_tickers: [],
            stock_tickers: tickers,
            shares: Object.fromEntries(tickers.map(ticker => [ticker, 0])),
            simulation_id: this.props.simulation.id,
            simulation_time: (this.props.simulation.start_time - 1) * 1000,
            order_queue: [],
            // time series
            quote_times: new Array(pre_open_points).fill(0).map((_, i) => (this.props.simulation.start_time - pre_open_points + i) * 1000),
            account_values: new Array(pre_open_points).fill(initial_cash),
            stock_prices: Object.fromEntries(tickers.map(ticker => [ticker, {price: {}, upDownPct: 0}])),
            // start/pause/stop states
            simulationHasStarted: false,
            simulationIsRunning: false,
            simulationIsStopped: false,
            // styles
            upColor: '#198754',   // green
            downColor: '#dc3545', // red
            // trades
            tradeErrorMsg: '',
            // tick errors
            noTickDataCount: 0,
            noTickDataMaxTries: 5,
            showAlert: false,
        }

        // bind methods
        this.startSimulation = this.startSimulation.bind(this);
        this.pauseSimulation = this.pauseSimulation.bind(this);
        this.stopSimulation = this.stopSimulation.bind(this);
        this.closeSimulation = this.closeSimulation.bind(this);
        this.handleNoSimulationData = this.handleNoSimulationData.bind(this);
        this.requestTickUpdates = this.requestTickUpdates.bind(this);
        this.receiveTickUpdate = this.receiveTickUpdate.bind(this);
        this.handleSharesInput = this.handleSharesInput.bind(this);
        this.fulfillTradeOrders = this.fulfillTradeOrders.bind(this);
        this.handleBuy = this.handleBuy.bind(this);
        this.handleSell = this.handleSell.bind(this);
    }


    startSimulation() {
        this.setState({
            simulationHasStarted: true,
            simulationIsRunning: true
        }, () => {
            this.requestTickUpdates();
            console.log('Start simulation');
        });
    }


    pauseSimulation() {
        this.setState({
            simulationIsRunning: false
        },
        console.log('Paused simulation...')
        );
    }


    stopSimulation() {
        // Graceful exit from simulation page.
        this.createSimulationSummary();
        this.closeSimulation();
    }


    handleNoSimulationData() {
        this.setState({
            simulationIsStopped: true,
            showAlert: true
        });
    }

    closeSimulation() {
        // Clean up tick data from database and clear current simulation.
        // Causes redirect to homepage.
        this.setState({
            simulationIsRunning: false,
            simulationIsStopped: true
        },
            // Delete ticks from database and redirect to homepage
            () => {
                console.log('Stop simulation');
                const simulation = {
                    id: this.props.simulation.id,
                    session_token: this.props.user.session_token
                };
                this.props.closeCurrentSimulation(simulation);
            }
        );
    }


    createSimulationSummary() {
        const simulationSummary = {
            simulation_id: this.props.simulation.id,
            session_token: this.props.user.session_token,
            username: this.props.user.username,
            final_cash: Math.round(this.state.account_value * 100) / 100,
            stopped_time: this.state.simulation_time / 1000
        }
        this.props.createSimulationSummary(simulationSummary);
    }


    requestTickUpdates() {
        if (this.state.simulationIsRunning) {
            // send request for next tick
            $.ajax({
                url: '/api/tick',
                method: 'GET',
                data: { tick: { simulation_id: this.props.simulation.id, timestamp: (this.state.simulation_time / 1000) + 1} },
                complete: () => {
                    // fulfill trade orders
                    this.fulfillTradeOrders();

                    // schedule the next request only when the current one is complete
                    setTimeout(this.requestTickUpdates, 1000);
                },
                success: (response) => {
                    // receive update in callback
                    this.receiveTickUpdate(response);
                }
            });
        }
    }


    receiveTickUpdate(response) {
        // update simulation time, quotes and portfolio with data from new tick
        if (this.state.simulationIsStopped) {
            return;
        }

        // handle errors
        if (response.errors && (response.errors === ["Requested tick after simulation end."])) {
            console.log('Simulation ended naturally');
            this.stopSimulation();
            return;
        }
 
        if (!response.tick || !response.quotes) {
            console.log('Error receiving ticks');
            if (response.errors) { console.log(response.errors); }

            this.setState({
                noTickDataCount: this.state.noTickDataCount + 1
            },
            () => {
                this.pauseSimulation();
                if (this.state.noTickDataCount >= this.state.noTickDataMaxTries) {
                    this.handleNoSimulationData();
                }
            });
            return;
        }

        // update time
        const newSimulationTime = response.tick.timestamp * 1000;

        // update quotes
        let newStockPrices = this.state.stock_prices;
        for (const t of this.state.stock_tickers) {
            const newPrice = response.quotes[t]
            newStockPrices[t].price[newSimulationTime] = newPrice;

            const newUpDownPct = Object.keys(newStockPrices[t].price).length > 0 ? 
                newPrice / newStockPrices[t].price[this.props.simulation.start_time * 1000]  - 1 : 0;
            newStockPrices[t].upDownPct = newUpDownPct;
        }

        // update portfolio market values
        let newPortfolio = this.state.portfolio;
        let newAccountValue = this.state.portfolio.cash.market_value;
        for (const t of this.state.portfolio_tickers) {
            newPortfolio[t].market_value = newPortfolio[t].units * newStockPrices[t].price[newSimulationTime];
            newAccountValue += newPortfolio[t].market_value;
        }

        this.setState({
            simulation_time: newSimulationTime,
            account_value: newAccountValue,
            quote_times: this.state.quote_times.concat(newSimulationTime),
            account_values: this.state.account_values.concat(newAccountValue),
            stock_prices: newStockPrices,
            noTickDataCount: 0
        });
    }


    formatDollarAmount(num) {
        // Return num with comma separators and 2 decimal places.
        if (num === 0) {return '0'}

        if (!num) {return ''}

        let numStr = Number(num.toFixed(2)).toLocaleString();

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


    formatTimestampAsString(timestamp) {
        // Return a string in format 'yyyy-mm-dd hh:mm:ss'
        const d = new Date(timestamp);
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const monthStr = month < 10 ? '0'.concat(month) : String(month)
        const dayStr = day < 10 ? '0'.concat(day) : String(day);

        const datePart = String(d.getFullYear()) + '-' + monthStr + '-' + day;
        const timePart = d.toLocaleTimeString('en-UK');
        return datePart + ' ' + timePart;
    }


    handleSharesInput(ticker, e) {
        let newShares = this.state.shares;
        newShares[ticker] = e.target.value;
        this.setState({ shares: newShares });
    }


    fulfillTradeOrders() {
        let i = 0;
        for (const order of this.state.order_queue) {
            const executionTime = order.time + 1000 * this.props.simulation.exec_delay_sec;
            if (executionTime > this.state.simulation_time) {
                break;
            }

            switch (order.action) {
                case BUY:
                    this.handleBuy(order.ticker, order.shares, executionTime);
                    break;

                case SELL:
                    this.handleSell(order.ticker, order.shares, executionTime);
                    break;
            }
            ++i;
        }

        let newOrderQueue = this.state.order_queue;
        newOrderQueue.splice(0, i);

        this.setState({
            order_queue: newOrderQueue
        });
    }


    getTradeCost(ticker, shares, time) {
        return shares * this.state.stock_prices[ticker].price[time];
    }


    handleBuy(ticker, shares, time) {
        console.log('Buy ' + shares.toString() + ' shares ' + ticker + ' at ' + this.formatTimestampAsString(time));

        let tradeCost = this.getTradeCost(ticker, shares, time);
        tradeCost += this.props.simulation.transaction_cost;
        console.log('Trade cost: $' + this.formatDollarAmount(tradeCost));

        // insufficient funds
        if (tradeCost > this.state.portfolio.cash.market_value) {
            this.setState({ tradeErrorMsg: 'Available cash $' + this.formatDollarAmount(this.state.portfolio.cash.market_value)
                + ' insufficient to buy ' + shares.toString()
                + ' shares at total cost $' + this.formatDollarAmount(tradeCost) + '.'},
                console.log(this.state.tradeErrorMsg));
            return;
        }

        // update portfolio
        const newAvailableCash = this.state.portfolio.cash.market_value - tradeCost;
        let newPortfolio = this.state.portfolio;
        let newPortfolioTickers = this.state.portfolio_tickers;

        newPortfolio.cash.units = newAvailableCash;
        newPortfolio.cash.market_value = newAvailableCash;

        if (newPortfolio[ticker]) {
            // ticker already in portfolio
            newPortfolio[ticker].units += shares;
            newPortfolio[ticker].market_value = newPortfolio[ticker].units * this.state.stock_prices[ticker].price[this.state.simulation_time];
        }
        else {
            // add ticker to portfolio
            let i = 0;
            while (ticker > this.state.portfolio_tickers[i]) { ++i; }
            newPortfolioTickers.splice(i, 0, ticker);

            newPortfolio[ticker] = { units: shares, market_value: shares * this.state.stock_prices[ticker].price[this.state.simulation_time]};
        }

        // clear old order
        let newShares = this.state.shares;
        newShares[ticker] = 0;

        // update state
        this.setState({
            portfolio: newPortfolio,
            portfolio_tickers: newPortfolioTickers,
            shares: newShares
        });

    }


    handleSell(ticker, shares, time) {
        console.log('Sell ' + shares.toString() + ' shares ' + ticker + ' at ' + this.formatTimestampAsString(time));

        let tradeCost = this.getTradeCost(ticker, shares, time);
        tradeCost -= this.props.simulation.transaction_cost;
        console.log('Trade cost: $' + this.formatDollarAmount(tradeCost));

        // insufficient shares
        if ((this.state.portfolio_tickers.findIndex((t) => t === ticker) === -1) || (shares > this.state.portfolio[ticker].units)) {
            this.setState({
                tradeErrorMsg: 'Cannot sell ' + shares.toString() + ' shares of ' + ticker + '. '
                    + 'Insufficient shares of ' + ticker + ' held in portfolio.'
            }, console.log(this.state.tradeErrorMsg));
            return;
        }

        // update portfolio
        const newAvailableCash = this.state.portfolio.cash.market_value + tradeCost;
        let newPortfolio = this.state.portfolio;
        let newPortfolioTickers = this.state.portfolio_tickers;

        newPortfolio.cash.units = newAvailableCash;
        newPortfolio.cash.market_value = newAvailableCash;

        // ticker already in portfolio
        newPortfolio[ticker].units -= shares;

        if (newPortfolio[ticker].units > 0) {
            // ticker still in portfolio
            newPortfolio[ticker].market_value = newPortfolio[ticker].units * this.state.stock_prices[ticker].price[this.state.simulation_time];
        }
        else {
            // remove ticker from portfolio
            const i = this.state.portfolio_tickers.findIndex((t) => t === ticker);
            newPortfolioTickers.splice(i, 1);

            delete newPortfolio[ticker];
        }

        // clear old order
        let newShares = this.state.shares;
        newShares[ticker] = 0;

        // update state
        this.setState({
            portfolio: newPortfolio,
            portfolio_tickers: newPortfolioTickers,
            shares: newShares
        });

    }


    componentDidMount() {

        if (!this.props.simulation || this.state.simulationIsStopped) {
            return;
        }

        if (this.state.simulation_time < this.props.simulation.start_time * 1000) {
            // send request for first tick, allow some time for database to load
            setTimeout(() =>
            {
                $.ajax({
                    url: '/api/tick',
                    method: 'GET',
                    data: { tick: { simulation_id: this.state.simulation_id, timestamp: (this.state.simulation_time / 1000) + 1 } },
                    success: (response) => {
                        // receive update in callback
                        this.receiveTickUpdate(response);
                    }
                })
            }, 500);
        }

        // poftfolio chart

        const lineColor = this.state.account_value >= this.props.simulation.initial_cash ? this.state.upColor : this.state.downColor;

        const portfolioChartData = [
            {
                x: this.state.quote_times.map(time => this.formatTimestampAsString(time)),
                y: this.state.account_values,
                type: "scatter",
                mode: "lines",
                line: { color: lineColor }
            }
        ];

        const portfolioChartLayout = {
            title: 'Account Value: $' + this.formatDollarAmount(this.state.account_value),
            titlefont: {
                family: 'American Typewriter, serif',
                color: '#ff6600'
            },
            bgcolor: 'red',
            paper_bgcolor: '#091020',
            plot_bgcolor: '#14171C',
            margin: {
                t: 60,
                r: 30,
                l: 60
            },
            separator: ',',
            showLegend: false,
            xaxis : {
                title: 'Time',
                titlefont: {
                    family: 'American Typewriter, serif',
                    color: '#91ABBD'
                },
                tickfont: { color: '#91ABBD' },
                tickcolor: '#91ABBD',
                tickformat: '%-I:%M:%S',
                hoverformat: '%-I:%M:%S %p'
            },
            yaxis: {
                autotypenumbers: 'strict',
                minexponent: 9,
                titlefont: {
                    family: 'American Typewriter, serif'
                },
                tickfont: { color: '#91ABBD' },
                tickcolor: '#91ABBD',
                tickformat: "$,.0f"
            },
        };

        // can be put in state
        const portfolioChartConfig = {
            displayModeBar: false,
            scrollZoom: true,
        };

        //const plotElement = document.getElementById('portfolio-chart');
        Plotly.react('portfolio-chart', portfolioChartData, portfolioChartLayout, portfolioChartConfig);

    }

    componentDidUpdate() {
        this.componentDidMount();
    }

    render() {

        // Redirect to homepage if simulation is stopped
        if (!this.props.simulation) {
            return <Redirect to="/homepage" />;
        }

        // portfolio table rows
        const portfolio_table_rows = this.state.portfolio_tickers.map(t => 
            <tr key={t}>
                <td style={{ textAlign: 'left' }}>{t}</td>
                <td style={{ textAlign: 'right', color: this.state.stock_prices[t].upDownPct >= 0 ? this.state.upColor : this.state.downColor }}>
                    {(100 * this.state.stock_prices[t].upDownPct).toFixed(2)}%</td>
                <td style={{ textAlign: 'right', color: this.state.stock_prices[t].upDownPct >= 0 ? this.state.upColor : this.state.downColor }}>
                    {this.formatDollarAmount(this.state.stock_prices[t].price[this.state.simulation_time])}</td>
                <td style={{ textAlign: 'center' }}>
                    {this.state.portfolio[t].units}</td>
                <td style={{ textAlign: 'right', color: '#ff6600'}}>
                    ${this.formatDollarAmount(this.state.portfolio[t].market_value)}</td>
            </tr>    
        );

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
                            Time: {new Date(Math.max(this.state.simulation_time, this.props.simulation.start_time * 1000)).toLocaleTimeString()}
                </Row>
                </Col>
                </Row>
                <Row>
                <Alert
                    variant="danger"
                    dismissible="true"
                    closeVariant="red"
                    onClose={() => {this.closeSimulation();}}
                    show={this.state.showAlert}
                >
                    <Alert.Heading>Simulation Failed</Alert.Heading>
                    <hr/>
                    <p>No data available for any of the tickers {this.state.stock_tickers.join(', ')} on the simulation date.<br/>
                    These might be unsupported stocks or it might be a holiday.</p>
                </Alert>
                <Col> {/* Portfolio Chart */}
                    <div id="portfolio-chart"></div>
                    <Row>
                        <p style={{textAlign: 'right', color: '#ff6600'}}>
                            Available cash: ${this.formatDollarAmount(this.state.portfolio.cash.market_value)}
                        </p>
                    </Row>     
                    <Table
                        id="portfolio-table"
                        responsive="true"
                    >
                        <thead>
                            <tr style={{ color: '#91ABBD'}}>
                                <th style={{ textAlign: 'left' }}>Ticker</th>
                                <th style={{ textAlign: 'right' }}>Change</th>
                                <th style={{ textAlign: 'right' }}>Price</th>
                                <th style={{ textAlign: 'center' }}>Shares</th>
                                <th style={{ textAlign: 'right' }}>Market Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {portfolio_table_rows}
                        </tbody>

                    </Table>     
                </Col>
                <Col> {/* Stock List */}
                Trade
                    <List
                        values={this.state.stock_tickers}
                        onChange={({ oldIndex, newIndex}) => {this.setState({stock_tickers: arrayMove(this.state.stock_tickers, oldIndex, newIndex)})}}
                        transitionDuration={0}
                            renderList={({ children, props }) => <ul {...props} style={{ listStyleType: "none", margin: 0, padding: 0 }}>{children}</ul>}
                        renderItem={({ value, props }) =>
                            <li {...props} style={{ ...props.style, listStyleType: "none" }}>
                            <Container
                                fluid
                                className="quote-display-container"
                            >
                                <Row
                                    className="align-items-center"
                                    style={{ color: "#91ABBD" }}
                                >
                                    <Col>
                                        {value}
                                    </Col>
                                    <Col
                                        style={{ color: this.state.stock_prices[value].upDownPct >= 0 ? this.state.upColor : this.state.downColor }}
                                    >
                                        <Row>
                                            {this.formatDollarAmount(this.state.stock_prices[value].price[this.state.simulation_time])}
                                        </Row>
                                        <Row>
                                            {(100 * this.state.stock_prices[value].upDownPct).toFixed(2)}%
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Form.Group
                                            as={Col}
                                        >
                                            <Row>
                                            <Form.Label
                                                column="sm"
                                                style={{textAlign: "left",
                                                        paddingLeft: 0,
                                                        paddingRight: 0,
                                                        paddingTop: 0,
                                                        paddingBottom: 0,
                                                        marginTop: 0,
                                                        marginBottom: 0}}
                                            >Shares:</Form.Label>
                                            </Row>
                                            <Row>
                                                <Form.Control
                                                    id="shares-input"
                                                    type="number"
                                                    min="0"
                                                    value={this.state.shares[value]}
                                                    onChange={(e) => this.handleSharesInput(value, e)}
                                                />
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Row>
                                            Price
                                        </Row>
                                        <Row
                                            style={{ color: this.state.shares[value] > 0 ? "#ff6600" : "#91ABBD" }}
                                        >
                                            ${this.formatDollarAmount(this.state.shares[value] * this.state.stock_prices[value].price[this.state.simulation_time])}
                                        </Row>
                                    </Col>
                                    <Col>
                                        <ButtonGroup
                                            vertical
                                            size="sm"
                                        >
                                            <Button
                                                id="button-buy"
                                                active={true}
                                                variant="primary"
                                                disabled={(this.state.simulationHasStarted && !this.state.simulationIsRunning) ||
                                                        (!this.state.stock_prices[value].price[this.state.simulation_time]) ||
                                                        (this.state.shares[value] === '0')}
                                                    onClick={() => {
                                                        this.setState({
                                                            order_queue: this.state.order_queue.concat(
                                                                {
                                                                    action: BUY,
                                                                    ticker: value,
                                                                    shares: Number(this.state.shares[value]),
                                                                    time: this.state.simulation_time
                                                                })
                                                        })
                                                    }}
                                            >Buy</Button>
                                            <Button
                                                id="button-sell"
                                                active={true}
                                                variant="secondary"
                                                    disabled={(this.state.simulationHasStarted && !this.state.simulationIsRunning) ||
                                                        (this.state.portfolio_tickers.findIndex(t => t === value) === -1) ||
                                                        (!this.state.stock_prices[value].price[this.state.simulation_time]) ||
                                                        (Number(this.state.shares[value]) > this.state.portfolio[value].units)}
                                                    onClick={() => {
                                                        this.setState({
                                                            order_queue: this.state.order_queue.concat(
                                                                {
                                                                    action: SELL,
                                                                    ticker: value,
                                                                    shares: Number(this.state.shares[value]),
                                                                    time: this.state.simulation_time
                                                                })
                                                        })
                                                    }}
                                            >Sell</Button>
                                        </ButtonGroup>
                                    </Col>
                                </Row>
                            </Container>
                            </li>
                        }
                    />
                    {/* End of moveable List */}
                </Col>
                </Row>
            </Container>
        );
    }

}

export default Simulation;
