import { combineReducers } from 'redux';
import sessionReducer from './session';
import simulationReducer from './simulation';
import simulationSummaryReducer from './simulation_summary';

export default combineReducers({
    session: sessionReducer,
    simulation: simulationReducer,
    simulation_summary: simulationSummaryReducer
});
