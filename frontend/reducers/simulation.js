import { RECEIVE_CURRENT_SIMULATION, DELETE_CURRENT_SIMULATION } from "../actions/simulation";

// default state
const _nullSimulation = {
    currentSimulation: null,
    errors: {}
};

// simulation reducer
export default (state = _nullSimulation, action) => {
    Object.freeze(state);
    switch (action.type) {

        case RECEIVE_CURRENT_SIMULATION:
            return Object.assign({}, {  currentSimulation: action.simulation.simulation,
                                        errors: action.simulation.errors });

        case DELETE_CURRENT_SIMULATION:
            return _nullSimulation;

        default:
            return state;
    }
}
