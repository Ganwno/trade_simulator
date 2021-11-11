import { combineReducers } from 'redux';
import sessionReducer from './session';
import simulationReducer from './simulation';

export default combineReducers({
    session: sessionReducer,
    simulation: simulationReducer
});
