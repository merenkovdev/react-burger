import {
	FORM_NAME_FORGOT_PASSWORD,
	FORM_NAME_RESET_PASSWORD,
	FORM_NAME_LOGIN,
	FORM_NAME_REGISTER,
	API_FORGOT_PASSWORD,
	API_RESET_PASSWORD,
} from '../../utils/constants';
import { getDataRequest } from '../../utils/utils';

export const CHANGE_VALUE = 'CHANGE_VALUE';

export const FORM_REQUEST = 'FORM_REQUEST';
export const FORM_SUCCESS = 'FORM_SUCCESS';
export const FORM_FAILED = 'FORM_FAILED';

const createActionChangeValue= (formName) => (name, value) => (dispatch) => {
	dispatch({
		name,
		value,
		formName,
		type: CHANGE_VALUE,
	});
};

const createActionFormRequest = (formName) => () => (dispatch) => {
	dispatch({
		formName,
		type: FORM_REQUEST,
	});
};

const createActionFormSuccess = (formName) => (data) => (dispatch) => {
	dispatch({
		formName,
		data,
		type: FORM_SUCCESS,
	});
};

const createActionFormFailed = (formName) => (error) => (dispatch) => {
	dispatch({
		formName,
		error,
		type: FORM_FAILED,
	});
};

export const actionChangeValueForgotForm = createActionChangeValue(FORM_NAME_FORGOT_PASSWORD);
export const actionChangeValueResetForm = createActionChangeValue(FORM_NAME_RESET_PASSWORD);
export const actionChangeValueLogin = createActionChangeValue(FORM_NAME_LOGIN);
export const actionChangeValueRegister = createActionChangeValue(FORM_NAME_REGISTER);

export const actionFormRequestForgotForm = createActionFormRequest(FORM_NAME_FORGOT_PASSWORD);
export const actionFormRequestResetForm = createActionFormRequest(FORM_NAME_RESET_PASSWORD);
export const actionFormRequestLogin = createActionFormRequest(FORM_NAME_LOGIN);
export const actionFormRequestRegister = createActionFormRequest(FORM_NAME_REGISTER);

export const actionFormSuccesForgotForm = createActionFormSuccess(FORM_NAME_FORGOT_PASSWORD);
export const actionFormSuccesResetForm = createActionFormSuccess(FORM_NAME_RESET_PASSWORD);
export const actionFormSuccesLogin = createActionFormSuccess(FORM_NAME_LOGIN);
export const actionFormSuccesRegister = createActionFormSuccess(FORM_NAME_REGISTER);

export const actionFormFailedForgotForm = createActionFormFailed(FORM_NAME_FORGOT_PASSWORD);
export const actionFormFailedResetForm = createActionFormFailed(FORM_NAME_RESET_PASSWORD);
export const actionFormFailedLogin = createActionFormFailed(FORM_NAME_LOGIN);
export const actionFormFailedRegister = createActionFormFailed(FORM_NAME_REGISTER);

export const requestForgotForm = (requestData) => (dispatch) => {
	dispatch(actionFormRequestForgotForm());

	getDataRequest(API_FORGOT_PASSWORD, requestData)
		.then(response => {
			dispatch(actionFormSuccesForgotForm());
		})
		.catch((error) => {
			dispatch(actionFormFailedForgotForm(error));
		});
};

export const requestResetForm = (requestData) => (dispatch) => {
	dispatch(actionFormRequestResetForm());

	getDataRequest(API_RESET_PASSWORD, requestData)
		.then(response => {
			dispatch(actionFormSuccesResetForm());
		})
		.catch((error) => {
			dispatch(actionFormFailedResetForm(error));
		});
};