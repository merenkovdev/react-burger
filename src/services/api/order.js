import { API_ORDERS } from '../../utils/constants';
import { checkResponse } from '../../utils/utils';
import { getAccessToken } from '../../utils/tokens';

const requestCreateOrder = async (requestData) => {
	const {
		token,
		authorizationScheme,
		refreshToken,
	} = getAccessToken();

	if (!token || !authorizationScheme || !refreshToken) {
		return Promise.reject('Нет данных для авторизации');
	}

	try {
		const response = await fetch(API_ORDERS, {
			method: 'POST',
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
	requestCreateOrder,
};
