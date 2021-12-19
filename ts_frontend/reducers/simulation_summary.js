import { RECEIVE_SIMULATION_SUMMARY, RECEIVE_SIMULATION_SUMMARIES } from "../actions/simulation_summary";

// default state
const _nullSimulationSummary = {
    currentSimulationSummary: null,
    allSimulationSummaries: [],
    errors: {}
};

// simulation summary reducer
export default (state = _nullSimulationSummary, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_SIMULATION_SUMMARY:
            return Object.assign({}, { currentSimulationSummary: action.simulationSummary.simulationSummary,
                                        errors: action.simulationSummary.errors });

        case RECEIVE_SIMULATION_SUMMARIES:
            return Object.assign({}, { allSimulationSummaries: action.simulation_summaries });

        default:
            return state;
    }
}
