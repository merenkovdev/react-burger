const isEmpty = (value) => {
	return value === undefined ||
			value === null ||
			(typeof value === 'object' && Object.keys(value).length === 0) ||
			(typeof value === 'string' && value.trim().length === 0);
};

const checkResponse = (res) => {
	if (res.ok) {
		return res.json();
	}

	return res.json()
		.then(({ message }) => {
			return Promise.reject(message);
		})
		.catch(error => {
			return Promise.reject(error);
		});
};

const getDataRequest = (url, data) => new Promise((resolve, reject) => {
	const options = data ?
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		} : {};

	try {
		fetch(url, options)
			.then(checkResponse)
			.then(response => {
				if (!response.success) {
					throw new Error(`
						Запрос к ${ url } не успешен.
						Response: ${ JSON.stringify(response) }
					`.trim());
				}
				resolve(response);
			})
			.catch(reject);
	} catch (error) {
		console.warn(error);
	}
});

const throttle = (func, timeFrame) => {
	let lastTime = 0;

	return function (...args) {
		const now = new Date();

		if (now - lastTime >= timeFrame) {
			func(...args);
			lastTime = now;
		}
	};
};

const getAccessToken = () => {
	const tokensData = localStorage.getItem('accessToken');

	if (!tokensData) {
		return {};
	}

	return  JSON.parse(tokensData)?.accessToken || {};
};

export {
	isEmpty,
	throttle,
	checkResponse,
	getDataRequest,
	getAccessToken,
};