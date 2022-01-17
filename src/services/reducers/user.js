import {
	FORGOT_REQUEST,
	FORGOT_SUCCESS,
	FORGOT_FAILED,
	RESET_REQUEST,
	RESET_SUCCESS,
	RESET_FAILED,
} from '../actions/user';

const defaultRequestState = {
	isRequested: false,
	hasError: false,
};

const userInitialState = {
	forgot: { ...defaultRequestState },
	reset: { ...defaultRequestState },
	login: { ...defaultRequestState },
	register: { ...defaultRequestState },
};

export const userReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case FORGOT_REQUEST:
			return {
				...state,
				forgot: {
					...state.forgot,
					isRequested: true,
					hasError: false,
				},
			};

		case FORGOT_SUCCESS: {
			const { data } = action;

			return {
				...state,
				forgot: {
					...state.forgot,
					data,
					isRequested: false,
					hasError: false,
				},
			};
		};

		case FORGOT_FAILED:
			return {
				...state,
				forgot: {
					...state.forgot,
					isRequested: false,
					hasError: true,
				},
			};

		case RESET_REQUEST:
			return {
				...state,
				reset: {
					...state.reset,
					isRequested: true,
					hasError: false,
				},
			};

		case RESET_SUCCESS: {
			const { data } = action;

			return {
				...state,
				reset: {
					...state.reset,
					data,
					isRequested: false,
					hasError: false,
				},
			};
		};

		case RESET_FAILED:
			return {
				...state,
				reset: {
					...state.reset,
					isRequested: false,
					hasError: true,
				},
			};

		default:
			return state;
	}
};
