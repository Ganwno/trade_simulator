import { connect } from 'react-redux';
import { createNewSimulation } from '../../actions/simulation';
import Homepage from './homepage';

const mapStateToProps = state => ({
    user: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
    createNewSimulation: formSimulation => dispatch(createNewSimulation(formSimulation))
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
