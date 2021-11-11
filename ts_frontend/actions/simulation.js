import { postSimulation, getSimulation, deleteSimulation } from "../utils/simulation";

export const RECEIVE_CURRENT_SIMULATION = "RECEIVE_CURRENT_SIMULATION";
export const DELETE_CURRENT_SIMULATION = "DELETE_CURRENT_SIMULATION";

const receiveCurrentSimulation = simulation => ({
    type: RECEIVE_CURRENT_SIMULATION,
    simulation
});


const deleteCurrentSimulation = simulation => ({
    type: DELETE_CURRENT_SIMULATION,
    simulation
});


export const createNewSimulation = formSimulation => dispatch => postSimulation(formSimulation)
    .then(simulation => dispatch(receiveCurrentSimulation(simulation)));

export const geCurrentSimulation = formSimulation => dispatch => getSimulation(formSimulation)
    .then(simulation => dispatch(receiveCurrentSimulation(simulation)));

export const closeCurrentSimulation = formSimulation => dispatch => deleteSimulation(formSimulation)
    .then(simulation => dispatch(deleteCurrentSimulation(simulation)));
