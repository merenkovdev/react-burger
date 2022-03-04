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

export const FORGOT_REQUEST: 'FORGOT_REQUEST' = 'FORGOT_REQUEST';
export const FORGOT_SUCCESS: 'FORGOT_SUCCESS' = 'FORGOT_SUCCESS';
export const FORGOT_INITIAL: 'FORGOT_INITIAL' = 'FORGOT_INITIAL';
export const FORGOT_FAILED: 'FORGOT_FAILED' = 'FORGOT_FAILED';

export const RESET_REQUEST: 'RESET_REQUEST' = 'RESET_REQUEST';
export const RESET_SUCCESS: 'RESET_SUCCESS' = 'RESET_SUCCESS';
export const RESET_INITIAL: 'RESET_INITIAL' = 'RESET_INITIAL';
export const RESET_FAILED: 'RESET_FAILED' = 'RESET_FAILED';

export const REGISTER_REQUEST: 'REGISTER_REQUEST' = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';
export const REGISTER_FAILED: 'REGISTER_FAILED' = 'REGISTER_FAILED';

export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';

export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';

export const USER_DATA_REQUEST: 'USER_DATA_REQUEST' = 'USER_DATA_REQUEST';
export const USER_DATA_SUCCESS: 'USER_DATA_SUCCESS' = 'USER_DATA_SUCCESS';
export const USER_DATA_FAILED: 'USER_DATA_FAILED' = 'USER_DATA_FAILED';

export const CHANGE_USER_DATA_REQUEST: 'CHANGE_USER_DATA_REQUEST' = 'CHANGE_USER_DATA_REQUEST';
export const CHANGE_USER_DATA_SUCCESS: 'CHANGE_USER_DATA_SUCCESS' = 'CHANGE_USER_DATA_SUCCESS';
export const CHANGE_USER_DATA_FAILED: 'CHANGE_USER_DATA_FAILED' = 'CHANGE_USER_DATA_FAILED';

export const SET_USER: 'SET_USER' = 'SET_USER';
export const CLEAR_USER: 'CLEAR_USER' = 'CLEAR_USER';

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
	readonly error: string;
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
	readonly error: string;
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

// forgot
export const forgot: AppThunk = (requestData) => (dispatch) => {
	dispatch({ type: FORGOT_REQUEST });

	requestForgot(requestData)
		.then(response => {
			if (!response.success) {
				throw new Error(response.message);
			}

			dispatch({ type: FORGOT_SUCCESS });
		})
		.catch(error => dispatch({ type: FORGOT_FAILED, error }));
};

// reset
export const reset: AppThunk = (requestData) => (dispatch) => {
	dispatch({ type: RESET_REQUEST });

	requestReset(requestData)
		.then(response => {
			if (!response.success) {
				throw new Error(response.message);
			}

			dispatch({ type: RESET_SUCCESS });
		})
		.catch(error => dispatch({ type: RESET_FAILED, error }));
};

export const returnResetInitialState = (dispatch: AppDispatch) => {
	dispatch({ type: FORGOT_INITIAL });
	dispatch({ type: RESET_INITIAL });
};

// register
export const register: AppThunk = (requestData: TRequestRegistration) => (dispatch) => {
	dispatch({ type: REGISTER_REQUEST });

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
			dispatch({ type: REGISTER_SUCCESS });
			dispatch({ type: SET_USER, user });
		})
		.catch((error) => dispatch({ type: REGISTER_FAILED, error }));
};

// login
export const login: AppThunk = (requestData: TRequestLogin) => (dispatch) => {
	dispatch({ type: LOGIN_REQUEST });

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
			dispatch({ type: LOGIN_SUCCESS });
			dispatch({ type: SET_USER, user });
		})
		.catch(error => dispatch({ type: LOGIN_FAILED, error }));
};

//logout
export const logout: AppThunk = () => (dispatch) => {
	dispatch({ type: LOGOUT_REQUEST });

	requestLogout()
		.then(response => {
			const { success, message } = response;

			if (!success) {
				throw new Error(message);
			}
			clearTokens();
			dispatch({ type: CLEAR_USER });
			dispatch({ type: LOGOUT_SUCCESS });
		})
		.catch(error => {
			dispatch({ type: LOGOUT_REQUEST, error });
		});
};

//
export const getUser: AppThunk = () => async (dispatch) => {
	dispatch({ type: USER_DATA_REQUEST });

	try {
		const responseUser = await requestUserData();

		if (responseUser.success) {
			dispatch({ type: SET_USER, user: responseUser.user });
			dispatch({ type: USER_DATA_SUCCESS });
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
				dispatch({ type: SET_USER, user: responseUser.user });
				dispatch({ type: USER_DATA_SUCCESS });
			}
		} catch (error) {
			dispatch({ type: USER_DATA_FAILED, error: getErrorMessage(error) });
			dispatch({ type: CLEAR_USER });
			console.warn(error);
		}
	}
};

export const changeUserData: AppThunk = (data: TRequestChange) => async (dispatch) => {
	dispatch({ type: CHANGE_USER_DATA_REQUEST });

	try {
		const responseUser = await requestChangeUserData(data);

		if (responseUser.success) {
			dispatch({ type: SET_USER, user: responseUser.user });
			dispatch({ type: CHANGE_USER_DATA_SUCCESS });
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
				dispatch({ type: SET_USER, user: responseUser.user });
				dispatch({ type: CHANGE_USER_DATA_SUCCESS });
			}
		} catch (error) {
			dispatch({ type: CHANGE_USER_DATA_FAILED, error: getErrorMessage(error) });
			console.warn(error);
		}
	}
};
