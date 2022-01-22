import {
	FORGOT_REQUEST,
	FORGOT_SUCCESS,
	FORGOT_FAILED,
	RESET_REQUEST,
	RESET_SUCCESS,
	RESET_FAILED,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	LOGOUT_REQUEST,
	LOGOUT_SUCCESS,
	LOGOUT_FAILED,
	USER_DATA_REQUEST,
	USER_DATA_SUCCESS,
	USER_DATA_FAILED,
	CHANGE_USER_DATA_REQUEST,
	CHANGE_USER_DATA_SUCCESS,
	CHANGE_USER_DATA_FAILED,
	SET_USER,
	CLEAR_USER,
} from '../actions/user';

const defaultRequestState = {
	isRequested: false,
	hasError: false,
	error: '',
};

const userInitialState = {
	forgot: { ...defaultRequestState },
	reset: { ...defaultRequestState },
	login: { ...defaultRequestState },
	register: { ...defaultRequestState },
	logout: { ...defaultRequestState },
	fetchUser: { ...defaultRequestState },
	changeUserData: { ...defaultRequestState },
	user: {},
	isAuth: false,
	authAttemptSucceeded: false,
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

		case REGISTER_REQUEST:
			return {
				...state,
				register: {
					...state.register,
					isRequested: true,
					hasError: false,
				},
			};

		case REGISTER_SUCCESS:
			return {
				...state,
				register: {
					...state.register,
					isRequested: false,
					hasError: false,
				},
			};

		case REGISTER_FAILED: {
			const { error } = action;
			return {
				...state,
				register: {
					...state.register,
					error,
					isRequested: false,
					hasError: true,
				},
			};
		};

		case LOGIN_REQUEST:
			return {
				...state,
				login: {
					...state.login,
					isRequested: true,
					hasError: false,
				},
			};

		case LOGIN_SUCCESS:

			return {
				...state,
				login: {
					...state.login,
					isRequested: false,
					hasError: false,
				},
			};

		case LOGIN_FAILED: {
			const { error } = action;
			return {
				...state,
				login: {
					...state.login,
					error,
					isRequested: false,
					hasError: true,
				},
			};
		};

		case USER_DATA_REQUEST:
			return {
				...state,
				fetchUser: {
					...state.fetchUser,
					isRequested: true,
					hasError: false,
				},
			};

		case USER_DATA_SUCCESS:

			return {
				...state,
				fetchUser: {
					...state.fetchUser,
					isRequested: false,
					hasError: false,
				},
				authAttemptSucceeded: true,
			};

		case USER_DATA_FAILED: {
			const { error } = action;
			return {
				...state,
				fetchUser: {
					...state.fetchUser,
					error,
					isRequested: false,
					hasError: true,
				},
				authAttemptSucceeded: true,
			};
		};
		case CHANGE_USER_DATA_REQUEST:
			return {
				...state,
				changeUserData: {
					...state.changeUserData,
					isRequested: true,
					hasError: false,
				},
			};

		case CHANGE_USER_DATA_SUCCESS:
			return {
				...state,
				changeUserData: {
					...state.changeUserData,
					isRequested: false,
					hasError: false,
				},
			};

		case CHANGE_USER_DATA_FAILED: {
			const { error } = action;
			return {
				...state,
				changeUserData: {
					...state.changeUserData,
					error,
					isRequested: false,
					hasError: true,
				},
			};
		};

		case LOGOUT_REQUEST:
			return {
				...state,
				login: {
					...state.login,
					isRequested: true,
					hasError: false,
				},
			};

		case LOGOUT_SUCCESS:

			return {
				...state,
				login: {
					...state.login,
					isRequested: false,
					hasError: false,
				},
			};

		case LOGOUT_FAILED: {
			const { error } = action;
			return {
				...state,
				login: {
					...state.login,
					error,
					isRequested: false,
					hasError: true,
				},
			};
		};

		case SET_USER: {
			const { user } = action;

			return {
				...state,
				user,
				isAuth: true,
			};
		};

		case CLEAR_USER:
			return {
				...state,
				user: {},
				isAuth: false,
			};

		default:
			return state;
	}
};