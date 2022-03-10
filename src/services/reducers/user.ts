import {
	FORGOT_REQUEST,
	FORGOT_SUCCESS,
	FORGOT_INITIAL,
	FORGOT_FAILED,
	RESET_REQUEST,
	RESET_SUCCESS,
	RESET_INITIAL,
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
} from '../constants/user';
import { TUserActions } from '../actions/user';
import { TUserState } from '../../types/redux';

const defaultRequestState = {
	isRequested: false,
	hasError: false,
	error: '',
};

export const userInitialState: TUserState = {
	login: { ...defaultRequestState },
	register: { ...defaultRequestState },
	logout: { ...defaultRequestState },
	fetchUser: { ...defaultRequestState },
	changeUserData: { ...defaultRequestState },
	reset: { ...defaultRequestState, success: false },
	forgot: { ...defaultRequestState, success: false },
	user: {
		name: '',
		email: '',
	},
	isAuth: false,
	authAttemptСompleted: false,
};

export const userReducer = (
	state = userInitialState,
	action: TUserActions
): TUserState => {
	switch (action.type) {
		case FORGOT_REQUEST:
			return {
				...state,
				forgot: {
					...state.forgot,
					success: false,
					isRequested: true,
					hasError: false,
				},
			};

		case FORGOT_SUCCESS:
			return {
				...state,
				forgot: {
					...state.forgot,
					success: true,
					isRequested: false,
					hasError: false,
				},
			};

		case FORGOT_INITIAL:
			return {
				...state,
				forgot: userInitialState.forgot,
			};

		case FORGOT_FAILED:
			return {
				...state,
				forgot: {
					...state.forgot,
					success: false,
					isRequested: false,
					hasError: true,
				},
			};

		case RESET_REQUEST:
			return {
				...state,
				reset: {
					...state.reset,
					success: false,
					isRequested: true,
					hasError: false,
				},
			};

		case RESET_SUCCESS:
			return {
				...state,
				reset: {
					...state.reset,
					success: true,
					isRequested: false,
					hasError: false,
				},
			};

		case RESET_INITIAL:
			return {
				...state,
				reset: userInitialState.reset,
			};

		case RESET_FAILED:
			return {
				...state,
				reset: {
					...state.reset,
					success: false,
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
				authAttemptСompleted: true,
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
				authAttemptСompleted: true,
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
				logout: {
					...state.logout,
					isRequested: true,
					hasError: false,
				},
			};

		case LOGOUT_SUCCESS:
			return {
				...state,
				logout: {
					...state.logout,
					isRequested: false,
					hasError: false,
				},
			};

		case LOGOUT_FAILED: {
			const { error } = action;
			return {
				...state,
				logout: {
					...state.logout,
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
				user: userInitialState.user,
				isAuth: false,
			};

		default:
			return state;
	}
};
