import {
	ACCESS_TOKEN_LIFETIME,
} from './constants';

type TAccessTokenStore = {
	authorizationScheme: string;
	refreshTime: number;
	refreshToken: string;
	token: string;
};

const getAccessToken = (): TAccessTokenStore => {
	const tokensData = localStorage.getItem('accessToken');

	if (!tokensData) {
		return {} as TAccessTokenStore;
	}

	return  JSON.parse(tokensData)?.accessToken || {};
};

const clearTokens = () => {
	localStorage.removeItem('accessToken');
};

const setTokens = (accessToken: string, refreshToken: string) => {
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
