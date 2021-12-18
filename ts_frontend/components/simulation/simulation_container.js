import { connect } from 'react-redux';
import { closeCurrentSimulation } from '../../actions/simulation';
import Simulation from './simulation';

const mapStateToProps = state => ({
    user: state.session.currentUser,
    simulation: state.simulation.currentSimulation
});

const mapDispatchToProps = dispatch => ({
    closeCurrentSimulation: formSimulation => dispatch(closeCurrentSimulation(formSimulation))
});

export default connect(mapStateToProps, mapDispatchToProps)(Simulation);
