import { connect } from 'react-redux';
import Simulation from './simulation';

const mapStateToProps = state => ({
    user: state.session.currentUser,
    simulation: state.simulation.currentSimulation
});

export default connect(mapStateToProps)(Simulation);
