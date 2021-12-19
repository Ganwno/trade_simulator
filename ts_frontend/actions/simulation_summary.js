import { postSimulationSummary, getSimulationSummaries } from "../utils/simulation_summary";

export const RECEIVE_SIMULATION_SUMMARY = "RECEIVE_SIMULATION_SUMMARY";
export const RECEIVE_SIMULATION_SUMMARIES = "RECEIVE_SIMULATION_SUMMARIES";

const receiveCurrentSimulationSummary = simulationSummary => ({
    type: RECEIVE_SIMULATION_SUMMARY,
    simulationSummary
});

const receiveAllSimulationSummaries = simulation_summaries => ({
    type: RECEIVE_SIMULATION_SUMMARIES,
    simulation_summaries
});

export const createSimulationSummary = simulationPayload => dispatch => postSimulationSummary(simulationPayload)
    .then(simulationSummary => dispatch(receiveCurrentSimulationSummary(simulationSummary)));

export const getAllSimulationSummaries = userPayload => dispatch => getSimulationSummaries(userPayload)
    .then(simulationSummaries => dispatch(receiveAllSimulationSummaries(simulationSummaries)));
