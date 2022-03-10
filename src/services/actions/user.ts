import {
	TRequestRegistration,
	TRequestLogin,
	TRequestChange,
} from './../../types/api';
import { TUser } from '../../types/api';
import { AppThunk, AppDispatch } from '../../types/redux';
import { setTokens, clearTokens } from '../../utils/tokens';
import { getErrorMessage } from '../../utils/utils';

import {
	requestRegistration,
	requestLogin,
	requestLogout,
	requestForgot,
	requestReset,
	requestToken,
	requestUserData,
	requestChangeUserData,
} from '../api/user';

import {
	FORGOT_REQUEST,
	FORGOT_SUCCESS,
	FORGOT_INITIAL,
	FORGOT_FAILED,
	RESET_REQUEST,
	RESET_SUCCESS,
	RESET_INITIAL,
	RESET_FAILED,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	LOGOUT_REQUEST,
	LOGOUT_SUCCESS,
	LOGOUT_FAILED,
	USER_DATA_REQUEST,
	USER_DATA_SUCCESS,
	USER_DATA_FAILED,
	CHANGE_USER_DATA_REQUEST,
	CHANGE_USER_DATA_SUCCESS,
	CHANGE_USER_DATA_FAILED,
	SET_USER,
	CLEAR_USER,
} from '../constants/user';

export type TForgotRequestAction = {
	readonly type: typeof FORGOT_REQUEST;
};

export type TForgotSuccessAction = {
	readonly type: typeof FORGOT_SUCCESS;
};

export type TForgotInitialAction = {
	readonly type: typeof FORGOT_INITIAL;
};

export type TForgotFailedAction = {
	readonly type: typeof FORGOT_FAILED;
};

export type TResetRequestAction = {
	readonly type: typeof RESET_REQUEST;
};

export type TResetInitialAction = {
	readonly type: typeof RESET_INITIAL;
};

export type TResetSuccessAction = {
	readonly type: typeof RESET_SUCCESS;
};

export type TResetFailedAction = {
	readonly type: typeof RESET_FAILED;
};

export type TRegisterRequestAction = {
	readonly type: typeof REGISTER_REQUEST;
};

export type TRegisterSuccessAction = {
	readonly type: typeof REGISTER_SUCCESS;
};

export type TRegisterFailedAction = {
	readonly type: typeof REGISTER_FAILED;
	readonly error: string;
};

export type TLoginRequestAction = {
	readonly type: typeof LOGIN_REQUEST;
};

export type TLoginSuccessAction = {
	readonly type: typeof LOGIN_SUCCESS;
};

export type TLoginFailedAction = {
	readonly type: typeof LOGIN_FAILED;
	readonly error: string;
};

export type TLogoutRequestAction = {
	readonly type: typeof LOGOUT_REQUEST;
};

export type TLogoutSuccessAction = {
	readonly type: typeof LOGOUT_SUCCESS;
};

export type TLogoutFailedAction = {
	readonly type: typeof LOGOUT_FAILED;
	readonly error: string;
};

export type TUserDataRequestAction = {
	readonly type: typeof USER_DATA_REQUEST;
};

export type TUserDataSuccessAction = {
	readonly type: typeof USER_DATA_SUCCESS;
};

export type TUserDataFailedAction = {
	readonly type: typeof USER_DATA_FAILED;
	readonly error: string;
};

export type TChangeUserDataRequestAction = {
	readonly type: typeof CHANGE_USER_DATA_REQUEST;
};

export type TChangeUserDataSuccessAction = {
	readonly type: typeof CHANGE_USER_DATA_SUCCESS;
};

export type TChangeUserDataFailedAction = {
	readonly type: typeof CHANGE_USER_DATA_FAILED;
	readonly error: string;
};

export type TSetUserAction = {
	readonly type: typeof SET_USER;
	readonly user: TUser;
};

export type TClearUserAction = {
	readonly type: typeof CLEAR_USER;
};

export type TUserActions =
	TForgotRequestAction
	| TForgotSuccessAction
	| TForgotInitialAction
	| TForgotFailedAction
	| TResetRequestAction
	| TResetInitialAction
	| TResetSuccessAction
	| TResetFailedAction
	| TRegisterRequestAction
	| TRegisterSuccessAction
	| TRegisterFailedAction
	| TLoginRequestAction
	| TLoginSuccessAction
	| TLoginFailedAction
	| TLogoutRequestAction
	| TLogoutSuccessAction
	| TLogoutFailedAction
	| TUserDataRequestAction
	| TUserDataSuccessAction
	| TUserDataFailedAction
	| TChangeUserDataRequestAction
	| TChangeUserDataSuccessAction
	| TChangeUserDataFailedAction
	| TSetUserAction
	| TClearUserAction
;

// Action Creators
export const forgotRequestAction = (): TForgotRequestAction => ({
	type: FORGOT_REQUEST,
});

export const forgotSuccessAction = (): TForgotSuccessAction => ({
	type: FORGOT_SUCCESS,
});

export const forgotInitialAction = (): TForgotInitialAction => ({
	type: FORGOT_INITIAL,
});

export const forgotFailedAction = (): TForgotFailedAction => ({
	type: FORGOT_FAILED,
});

export const resetRequestAction = (): TResetRequestAction => ({
	type: RESET_REQUEST,
});

export const resetInitialAction = (): TResetInitialAction => ({
	type: RESET_INITIAL,
});

export const resetSuccessAction = (): TResetSuccessAction => ({
	type: RESET_SUCCESS,
});

export const resetFailedAction = (): TResetFailedAction => ({
	type: RESET_FAILED,
});

export const registerRequestAction = (): TRegisterRequestAction => ({
	type: REGISTER_REQUEST,
});

export const registerSuccessAction = (): TRegisterSuccessAction => ({
	type: REGISTER_SUCCESS,
});

export const registerFailedAction = (error: string): TRegisterFailedAction => ({
	type: REGISTER_FAILED,
	error,
});

export const loginRequestAction = (): TLoginRequestAction => ({
	type: LOGIN_REQUEST,
});

export const loginSuccessAction = (): TLoginSuccessAction => ({
	type: LOGIN_SUCCESS,
});

export const loginFailedAction = (error: string): TLoginFailedAction => ({
	type: LOGIN_FAILED,
	error,
});

export const logoutRequestAction = (): TLogoutRequestAction => ({
	type: LOGOUT_REQUEST,
});

export const logoutSuccessAction = (): TLogoutSuccessAction => ({
	type: LOGOUT_SUCCESS,
});

export const logoutFailedAction = (error: string): TLogoutFailedAction => ({
	type: LOGOUT_FAILED,
	error,
});

export const userDataRequestAction = (): TUserDataRequestAction => ({
	type: USER_DATA_REQUEST,
});

export const userDataSuccessAction = (): TUserDataSuccessAction => ({
	type: USER_DATA_SUCCESS,
});

export const userDataFailedAction = (error: string): TUserDataFailedAction => ({
	type: USER_DATA_FAILED,
	error,
});

export const changeUserDataRequestAction = (): TChangeUserDataRequestAction => ({
	type: CHANGE_USER_DATA_REQUEST,
});

export const changeUserDataSuccessAction = (): TChangeUserDataSuccessAction => ({
	type: CHANGE_USER_DATA_SUCCESS,
});

export const changeUserDataFailedAction = (error: string): TChangeUserDataFailedAction => ({
	type: CHANGE_USER_DATA_FAILED,
	error,
});

export const setUserAction = (user: TUser): TSetUserAction => ({
	type: SET_USER,
	user,
});

export const clearUserAction = (): TClearUserAction => ({
	type: CLEAR_USER,
});

// forgot
export const forgot: AppThunk = (requestData) => (dispatch) => {
	dispatch(forgotRequestAction());

	requestForgot(requestData)
		.then(response => {
			if (!response.success) {
				throw new Error(response.message);
			}

			dispatch(forgotSuccessAction());
		})
		.catch(error => dispatch(forgotFailedAction()));
};

// reset
export const reset: AppThunk = (requestData) => (dispatch) => {
	dispatch(resetRequestAction());

	requestReset(requestData)
		.then(response => {
			if (!response.success) {
				throw new Error(response.message);
			}

			dispatch(resetSuccessAction());
		})
		.catch(error => dispatch(resetFailedAction()));
};

export const returnResetInitialState = (dispatch: AppDispatch) => {
	dispatch(forgotInitialAction());
	dispatch(resetInitialAction());
};

// register
export const register: AppThunk = (requestData: TRequestRegistration) => (dispatch) => {
	dispatch(registerRequestAction());

	requestRegistration(requestData)
		.then(response => {
			const {
				accessToken,
				refreshToken,
				user,
			} = response;

			if (!response.success) {
				throw new Error(response.message);
			}

			setTokens(accessToken, refreshToken);
			dispatch(registerSuccessAction());
			dispatch(setUserAction(user));
		})
		.catch((error) => dispatch(registerFailedAction(error)));
};

// login
export const login: AppThunk = (requestData: TRequestLogin) => (dispatch) => {
	dispatch(loginRequestAction());

	requestLogin(requestData)
		.then(response => {
			const {
				accessToken,
				refreshToken,
				user,
			} = response;

			if (!response.success) {
				throw new Error(response.message);
			}

			setTokens(accessToken, refreshToken);
			dispatch(loginSuccessAction());
			dispatch(setUserAction(user));
		})
		.catch(error => dispatch(loginFailedAction(error)));
};

//logout
export const logout: AppThunk = () => (dispatch) => {
	dispatch(logoutRequestAction());

	requestLogout()
		.then(response => {
			const { success, message } = response;

			if (!success) {
				throw new Error(message);
			}
			clearTokens();
			dispatch(clearUserAction());
			dispatch(logoutSuccessAction());
		})
		.catch(error => dispatch(loginFailedAction(error)));
};

//
export const getUser: AppThunk = () => async (dispatch) => {
	dispatch(userDataRequestAction());

	try {
		const responseUser = await requestUserData();

		if (responseUser.success) {
			dispatch(setUserAction(responseUser.user));
			dispatch(userDataSuccessAction());
		}
	} catch (error) {
		if (error !== 'jwt expired') {
			console.warn(getErrorMessage(error));
		}

		try {
			const responseTokens = await requestToken();

			if (!responseTokens.success) {
				throw new Error(responseTokens?.message);
			}

			setTokens(responseTokens.accessToken, responseTokens.refreshToken);

			const responseUser = await requestUserData();

			if (responseUser.success) {
				dispatch(setUserAction(responseUser.user));
				dispatch(userDataSuccessAction());
			}
		} catch (error) {
			dispatch(userDataFailedAction(getErrorMessage(error)));
			dispatch(clearUserAction());
			console.warn(error);
		}
	}
};

export const changeUserData: AppThunk = (data: TRequestChange) => async (dispatch) => {
	dispatch(changeUserDataRequestAction());

	try {
		const responseUser = await requestChangeUserData(data);

		if (responseUser.success) {
			dispatch(setUserAction(responseUser.user));
			dispatch(changeUserDataSuccessAction());
		}
	} catch (error) {
		if (error !== 'jwt expired') {
			console.warn(getErrorMessage(error));
		}

		try {
			const responseTokens = await requestToken();

			if (!responseTokens.success) {
				throw new Error(responseTokens?.message);
			}

			setTokens(responseTokens.accessToken, responseTokens.refreshToken);

			const responseUser = await requestChangeUserData(data);

			if (responseUser.success) {
				dispatch(setUserAction(responseUser.user));
				dispatch(changeUserData());
			}
		} catch (error) {
			dispatch(changeUserData(getErrorMessage(error)));
			console.warn(error);
		}
	}
};
