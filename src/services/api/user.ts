import {
	API_FORGOT_PASSWORD,
	API_LOGIN,
	API_REGISTER,
	API_RESET_PASSWORD,
	API_USER,
	API_LOGOUT,
	API_TOKEN,
} from '../../utils/constants';

import { checkResponse } from '../../utils/utils';
import { getAccessToken } from '../../utils/tokens';

import {
	TRequestForgot,
	TResponseBase,
	TRequestReset,
	TRequestRegistration,
	TRequestLogin,
	TRequestChange,
	TResponseUser,
	TResponseLogout,
	TResponseTokens,
} from '../../types/api';

const requestForgot = async (data: TRequestForgot): Promise<TResponseBase> => {
	try {
		const response = await fetch(API_FORGOT_PASSWORD, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});

		return checkResponse<TResponseBase>(response);
	} catch (error) {
		return Promise.reject(error);
	}
};

const requestReset = async (data: TRequestReset): Promise<TResponseBase> => {
	try {
		const response = await fetch(API_RESET_PASSWORD, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});

		return checkResponse<TResponseBase>(response);
	} catch (error) {
		return Promise.reject(error);
	}
};

const requestRegistration = async (data: TRequestRegistration): Promise<TResponseUser> => {
	try {
		const response = await fetch(API_REGISTER, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});

		return checkResponse<TResponseUser>(response);
	} catch (error) {
		return Promise.reject(error);
	}
};

const requestLogin = async (data: TRequestLogin): Promise<TResponseUser> => {
	try {
		const response = await fetch(API_LOGIN, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});

		return checkResponse<TResponseUser>(response);
	} catch (error) {
		return Promise.reject(error);
	}
};

const requestLogout = async (): Promise<TResponseLogout> => {
	const {	refreshToken } = getAccessToken();

	try {
		const response = await fetch(API_LOGOUT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				token: refreshToken,
			}),
		});

		return checkResponse<TResponseLogout>(response);
	} catch (error) {
		return Promise.reject(error);
	}
};

const requestToken = async (): Promise<TResponseTokens> => {
	const {	refreshToken } = getAccessToken();

	try {
		const response = await fetch(API_TOKEN, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				token: refreshToken,
			}),
		});
		return checkResponse<TResponseTokens>(response);
	} catch (error) {
		return Promise.reject(error);
	}
};

const requestUserData = async (): Promise<TResponseUser> => {
	const {
		token,
		authorizationScheme,
		refreshToken,
	} = getAccessToken();

	if (!token || !authorizationScheme || !refreshToken) {
		return Promise.reject('Нет данных для авторизации');
	}

	try {
		const response = await fetch(API_USER, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `${authorizationScheme} ${token}`,
			},
		});

		return checkResponse<TResponseUser>(response);
	} catch (error) {
		return Promise.reject(error);
	}
};

const requestChangeUserData = async (requestData: TRequestChange) => {
	const {
		token,
		authorizationScheme,
		refreshToken,
	} = getAccessToken();

	if (!token || !authorizationScheme || !refreshToken) {
		return Promise.reject('Нет данных для авторизации');
	}

	try {
		const response = await fetch(API_USER, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `${authorizationScheme} ${token}`,
			},
			body: JSON.stringify(requestData),
		});

		return checkResponse(response);
	} catch (error) {
		return Promise.reject(error);
	}
};

export {
	requestRegistration,
	requestLogin,
	requestLogout,
	requestForgot,
	requestReset,
	requestToken,
	requestUserData,
	requestChangeUserData,
};