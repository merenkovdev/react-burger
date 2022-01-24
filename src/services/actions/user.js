import {
	ACCESS_TOKEN_LIFETIME,
} from '../../utils/constants';
import { getDataRequest } from '../../utils/utils';
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

export const FORGOT_REQUEST = 'FORGOT_REQUEST';
export const FORGOT_SUCCESS = 'FORGOT_SUCCESS';
export const FORGOT_INITIAL = 'FORGOT_INITIAL';
export const FORGOT_FAILED = 'FORGOT_FAILED';

export const RESET_REQUEST = 'RESET_REQUEST';
export const RESET_SUCCESS = 'RESET_SUCCESS';
export const RESET_INITIAL = 'RESET_INITIAL';
export const RESET_FAILED = 'RESET_FAILED';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const USER_DATA_REQUEST = 'USER_DATA_REQUEST';
export const USER_DATA_SUCCESS = 'USER_DATA_SUCCESS';
export const USER_DATA_FAILED = 'USER_DATA_FAILED';

export const CHANGE_USER_DATA_REQUEST = 'CHANGE_USER_DATA_REQUEST';
export const CHANGE_USER_DATA_SUCCESS = 'CHANGE_USER_DATA_SUCCESS';
export const CHANGE_USER_DATA_FAILED = 'CHANGE_USER_DATA_FAILED';

export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';

const clearTokens = () => {
	localStorage.removeItem('accessToken');
};

const setTokens = (accessToken, refreshToken) => {
	const [authorizationScheme, token] = accessToken.split(' ');

	localStorage.setItem('accessToken', JSON.stringify({
		accessToken: {
			token,
			authorizationScheme,
			refreshToken,
			refreshTime: Date.now() + ACCESS_TOKEN_LIFETIME,
		}
	}));
};

// forgot
export const forgot = (requestData) => (dispatch) => {
	dispatch({ type: FORGOT_REQUEST });

	requestForgot(requestData)
		.then(response => {
			if (!response.success) {
				dispatch({ type: FORGOT_FAILED, error: response.message });

				throw new Error(response.message);
			}

			dispatch({ type: FORGOT_SUCCESS });
		})
		.catch(error => dispatch({ type: FORGOT_FAILED, error }));
};

// reset
export const reset = (requestData) => (dispatch) => {
	dispatch({ type: RESET_REQUEST });

	requestReset(requestData)
		.then(response => {
			if (!response.success) {
				dispatch({ type: RESET_FAILED, error: response.message });

				throw new Error(response.message);
			}

			dispatch({ type: RESET_SUCCESS });
		})
		.catch(error => dispatch({ type: RESET_FAILED, error }));
};

export const returnResetInitialState = (dispatch) => {
	dispatch({ type: FORGOT_INITIAL });
	dispatch({ type: RESET_INITIAL });
};

// register actions
export const actionRequestRegister = () => (dispatch) =>
	dispatch({ type: REGISTER_REQUEST });
export const actionSuccesRegister = (data) => (dispatch) => {
	dispatch({ type: REGISTER_SUCCESS });
	dispatch({ type: SET_USER, user: data });
};
export const actionFailedRegister = (error) => (dispatch) =>
	dispatch({ type: REGISTER_FAILED, error });

export const register = (requestData) => (dispatch) => {
	dispatch(actionRequestRegister());

	requestRegistration(requestData)
		.then(response => {
			const {
				accessToken,
				refreshToken,
				user,
			} = response;

			setTokens(accessToken, refreshToken);
			dispatch(actionSuccesRegister(user));
		})
		.catch((error) => dispatch(actionFailedRegister(error)));
};

// login actions
export const actionRequestLogin = () => (dispatch) =>
	dispatch({ type: LOGIN_REQUEST });
export const actionSuccesLogin = (data) => (dispatch) => {
	dispatch({ type: LOGIN_SUCCESS });
	dispatch({ type: SET_USER, user: data });
};
export const actionFailedLogin = (error) => (dispatch) =>
	dispatch({ type: LOGIN_FAILED, error });

export const login = (requestData) => (dispatch) => {
	dispatch(actionRequestLogin());

	requestLogin(requestData)
		.then(response => {
			const {
				accessToken,
				refreshToken,
				user,
			} = response;

			setTokens(accessToken, refreshToken);
			dispatch(actionSuccesLogin(user));
		})
		.catch(error => {
			dispatch(actionFailedLogin(error));
		});
};

export const logout = () => (dispatch) => {
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

export const getUser = () => async (dispatch) => {
	dispatch({ type: USER_DATA_REQUEST });

	try {
		const responseUser = await requestUserData();

		if (responseUser.success) {
			dispatch({ type: SET_USER, user: responseUser.user });
			dispatch({ type: USER_DATA_SUCCESS });
		}
	} catch (error) {
		if (!error === 'jwt expired') {
			throw new Error(error);
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
			dispatch({ type: USER_DATA_FAILED });
			dispatch({ type: CLEAR_USER });
			console.log(error);
		}
	}
};

export const changeUserData = (data) => async (dispatch) => {
	dispatch({ type: CHANGE_USER_DATA_REQUEST });

	try {
		const responseUser = await requestChangeUserData(data);

		if (responseUser.success) {
			dispatch({ type: SET_USER, user: responseUser.user });
			dispatch({ type: CHANGE_USER_DATA_SUCCESS });
		}
	} catch (error) {
		if (!error === 'jwt expired') {
			throw new Error(error);
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
			dispatch({ type: CHANGE_USER_DATA_FAILED });
			console.log(error);
		}
	}
};
