import { connect } from 'react-redux';
import { createNewSimulation } from '../../actions/simulation';
import { getAllSimulationSummaries } from '../../actions/simulation_summary';
import Homepage from './homepage';

const mapStateToProps = state => ({
    user: state.session.currentUser,
    simulationSummaries: state.simulation_summary.allSimulationSummaries
});

const mapDispatchToProps = dispatch => ({
    createNewSimulation: formSimulation => dispatch(createNewSimulation(formSimulation)),
    getAllSimulationSummaries: userPayload => dispatch(getAllSimulationSummaries(userPayload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
