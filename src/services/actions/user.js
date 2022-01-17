import {
	API_FORGOT_PASSWORD,
	API_RESET_PASSWORD,
} from '../../utils/constants';
import { getDataRequest } from '../../utils/utils';

export const FORGOT_REQUEST = 'FORGOT_REQUEST';
export const FORGOT_SUCCESS = 'FORGOT_SUCCESS';
export const FORGOT_FAILED = 'FORGOT_FAILED';

export const RESET_REQUEST = 'RESET_REQUEST';
export const RESET_SUCCESS = 'RESET_SUCCESS';
export const RESET_FAILED = 'RESET_FAILED';

// forgot actions
export const actionRequestForgot = () => (dispatch) =>
	dispatch({ type: FORGOT_REQUEST });

export const actionSuccesForgot = (data) => (dispatch) =>
	dispatch({ type: FORGOT_SUCCESS, data });

export const actionFailedForgot = () => (dispatch) =>
	dispatch({ type: FORGOT_FAILED });

export const requestForgot = (requestData) => (dispatch) => {
	dispatch(actionRequestForgot());

	getDataRequest(API_FORGOT_PASSWORD, requestData)
		.then(response => {
			dispatch(actionSuccesForgot());
		})
		.catch((error) => {
			dispatch(actionFailedForgot(error));
		});
};

// reset actions
export const actionRequestReset = () => (dispatch) =>
	dispatch({ type: RESET_REQUEST });
export const actionSuccesReset = (data) => (dispatch) =>
	dispatch({ type: RESET_SUCCESS, data });
export const actionFailedReset = () => (dispatch) =>
	dispatch({ type: RESET_FAILED });

export const requestReset = (requestData) => (dispatch) => {
	dispatch(actionRequestReset());

	getDataRequest(API_RESET_PASSWORD, requestData)
		.then(response => {
			dispatch(actionSuccesReset());
		})
		.catch((error) => {
			dispatch(actionFailedReset(error));
		});
};