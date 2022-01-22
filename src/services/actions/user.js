import {
	API_FORGOT_PASSWORD,
	API_RESET_PASSWORD,
	ACCESS_TOKEN_LIFETIME,
} from '../../utils/constants';
import { getDataRequest } from '../../utils/utils';
import {
	requestRegistration,
	requestLogin,
	requestLogout,
	requestToken,
	requestUserData,
	requestChangeUserData,
} from '../api/user';

export const FORGOT_REQUEST = 'FORGOT_REQUEST';
export const FORGOT_SUCCESS = 'FORGOT_SUCCESS';
export const FORGOT_FAILED = 'FORGOT_FAILED';

export const RESET_REQUEST = 'RESET_REQUEST';
export const RESET_SUCCESS = 'RESET_SUCCESS';
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

// forgot actions
export const actionRequestForgot = () => (dispatch) =>
	dispatch({ type: FORGOT_REQUEST });

export const actionSuccesForgot = (data) => (dispatch) =>
	dispatch({ type: FORGOT_SUCCESS, data });

export const actionFailedForgot = (error) => (dispatch) =>
	dispatch({ type: FORGOT_FAILED, error });

export const requestForgot = (requestData) => (dispatch) => {
	dispatch(actionRequestForgot());

	getDataRequest(API_FORGOT_PASSWORD, requestData)
		.then(response => {
			dispatch(actionSuccesForgot());
		})
		.catch((error) => dispatch(actionFailedForgot(error)));
};

// reset actions
export const actionRequestReset = () => (dispatch) =>
	dispatch({ type: RESET_REQUEST });
export const actionSuccesReset = (data) => (dispatch) =>
	dispatch({ type: RESET_SUCCESS, data });
export const actionFailedReset = (error) => (dispatch) =>
	dispatch({ type: RESET_FAILED, error });

export const requestReset = (requestData) => (dispatch) => {
	dispatch(actionRequestReset());

	getDataRequest(API_RESET_PASSWORD, requestData)
		.then(response => {
			dispatch(actionSuccesReset());
		})
		.catch((error) => dispatch(actionFailedReset(error)));
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