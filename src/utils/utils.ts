const isEmpty = (value: any) => {
	return value === undefined ||
			value === null ||
			(typeof value === 'object' && Object.keys(value).length === 0) ||
			(typeof value === 'string' && value.trim().length === 0);
};

const checkResponse = <T>(res: Response): Promise<T> => {
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

const throttle = (func: Function, timeFrame: number) => {
	let lastTime = 0;

	return function (...args: any) {
		const now = Date.now();

		if (now - lastTime >= timeFrame) {
			func(...args);
			lastTime = now;
		}
	};
};

const getErrorMessage = (error: any) => {
	if (error instanceof Error) {
		return error.message;
	}

	if (typeof error === 'string') {
		return error;
	}

	return 'Произошла неизвестная ошибка';
};

export {
	isEmpty,
	throttle,
	checkResponse,
	getErrorMessage,
};