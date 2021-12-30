import { postUser, postSession, deleteSession} from '../utils/session';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";

const receiveCurrentUser = response => ({
    type: RECEIVE_CURRENT_USER,
    response
});

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
});


export const createNewUser = formUser => dispatch => postUser(formUser)
    .then(response => dispatch(receiveCurrentUser(response)));

export const loginUser = formUser => dispatch => postSession(formUser)
    .then(response => dispatch(receiveCurrentUser(response)));

export const logoutUser = () => dispatch => deleteSession()
    .then(() => dispatch(logoutCurrentUser()));
