import {
	ACCESS_TOKEN_LIFETIME,
} from  '../utils/constants';

const getAccessToken = () => {
	const tokensData = localStorage.getItem('accessToken');

	if (!tokensData) {
		return {};
	}

	return  JSON.parse(tokensData)?.accessToken || {};
};

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

export {
	getAccessToken,
	setTokens,
	clearTokens,
};
