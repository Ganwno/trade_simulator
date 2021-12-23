import { connect } from 'react-redux';
import { logoutUser } from '../../actions/session';
import { clearAllSimulationSummaries } from '../../actions/simulation_summary';
import Logout from './logout';

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
    clearAllSimulationSummaries: () => dispatch(clearAllSimulationSummaries())
});

export default connect(null, mapDispatchToProps)(Logout);
