import { connect } from 'react-redux';
import { closeCurrentSimulation } from '../../actions/simulation';
import { createSimulationSummary } from '../../actions/simulation_summary';
import Simulation from './simulation';

const mapStateToProps = state => ({
    user: state.session.currentUser,
    simulation: state.simulation.currentSimulation,
    simulation_summary: state.simulation_summary.currentSimulationSummary
});

const mapDispatchToProps = dispatch => ({
    closeCurrentSimulation: formSimulation => dispatch(closeCurrentSimulation(formSimulation)),
    createSimulationSummary: simulationPayload => dispatch(createSimulationSummary(simulationPayload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Simulation);
