import {
	API_FORGOT_PASSWORD,
	API_LOGIN,
	API_REGISTER,
	API_RESET_PASSWORD,
	API_USER,
	API_LOGOUT,
	API_TOKEN,
} from '../../utils/constants';

import { checkResponse, getAccessToken } from '../../utils/utils';

const requestForgot = async (data) => {
	try {
		const response = await fetch(API_FORGOT_PASSWORD, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});

		return checkResponse(response);
	} catch (error) {
		return Promise.reject(error);
	}
};

const requestReset = async (data) => {
	try {
		const response = await fetch(API_RESET_PASSWORD, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});

		return checkResponse(response);
	} catch (error) {
		return Promise.reject(error);
	}
};

const requestRegistration = async (data) => {
	try {
		const response = await fetch(API_REGISTER, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});

		return checkResponse(response);
	} catch (error) {
		return Promise.reject(error);
	}
};

const requestLogin = async (data) => {
	try {
		const response = await fetch(API_LOGIN, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});

		return checkResponse(response);
	} catch (error) {
		return Promise.reject(error);
	}
};

const requestLogout = async () => {
	const {	refreshToken } = getAccessToken();
	try {
		const response = await fetch(API_LOGOUT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				token: refreshToken,
			}),
		});

		return checkResponse(response);
	} catch (error) {
		return Promise.reject(error);
	}
};

const requestToken = async () => {
	const {	refreshToken } = getAccessToken();

	try {
		const response = await fetch(API_TOKEN, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				token: refreshToken,
			}),
		});
		return checkResponse(response);
	} catch (error) {
		return Promise.reject(error);
	}
};

const requestUserData = async () => {
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

		return checkResponse(response);
	} catch (error) {
		return Promise.reject(error);
	}
};

const requestChangeUserData = async (requestData) => {
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