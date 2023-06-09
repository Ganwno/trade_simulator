import { connect } from 'react-redux';
import LoggedOutNavBar from './logged_out_nav_bar';

import { logoutUser } from '../../actions/session';

const mapStateToProps = state => ({
    currentUser: state.session.currentUser,
});

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoggedOutNavBar);
