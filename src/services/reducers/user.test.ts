import { userReducer, userInitialState } from './user';
import * as UserActions from '../actions/user';
import {
	mockUser,
 } from './mock';

describe('user reducer', () => {
	it('should return the initial state', () => {
		expect(userReducer(
			undefined,
			{} as UserActions.TUserActions
		)).toEqual(userInitialState);
	});

	// forgot
	it('should handle forgot request', () => {
		expect(userReducer(
			userInitialState,
			UserActions.forgotRequestAction()
		)).toEqual({
			...userInitialState,
			forgot: {
				...userInitialState.forgot,
				success: false,
				isRequested: true,
				hasError: false,
			},
		});
	});

	it('should handle forgot request success', () => {
		expect(userReducer({
				...userInitialState,
				forgot: {
					...userInitialState.forgot,
					success: false,
					isRequested: true,
					hasError: false,
				},
			},
			UserActions.forgotSuccessAction()
		)).toEqual({
			...userInitialState,
			forgot: {
				...userInitialState.forgot,
				success: true,
				isRequested: false,
				hasError: false,
			},
		});
	});

	it('should handle forgot request failed', () => {
		expect(userReducer({
				...userInitialState,
				forgot: {
					...userInitialState.forgot,
					success: true,
					isRequested: false,
					hasError: false,
				},
			},
			UserActions.forgotFailedAction()
		)).toEqual({
			...userInitialState,
			forgot: {
				...userInitialState.forgot,
				success: false,
				isRequested: false,
				hasError: true,
			},
		});
	});

	it('should handle forgot initial', () => {
		expect(userReducer({
				...userInitialState,
				forgot: {
					...userInitialState.forgot,
					success: true,
					isRequested: false,
					hasError: false,
				},
			},
			UserActions.forgotInitialAction()
		)).toEqual(userInitialState);
	});

	// reset
	it('should handle reset request', () => {
		expect(userReducer(
			userInitialState,
			UserActions.resetRequestAction()
		)).toEqual({
			...userInitialState,
			reset: {
				...userInitialState.reset,
				success: false,
				isRequested: true,
				hasError: false,
			},
		});
	});

	it('should handle reset request success', () => {
		expect(userReducer({
				...userInitialState,
				reset: {
					...userInitialState.reset,
					success: false,
					isRequested: true,
					hasError: false,
				},
			},
			UserActions.resetSuccessAction()
		)).toEqual({
			...userInitialState,
			reset: {
				...userInitialState.reset,
				success: true,
				isRequested: false,
				hasError: false,
			},
		});
	});

	it('should handle reset request failed', () => {
		expect(userReducer({
				...userInitialState,
				reset: {
					...userInitialState.reset,
					success: true,
					isRequested: false,
					hasError: false,
				},
			},
			UserActions.resetFailedAction()
		)).toEqual({
			...userInitialState,
			reset: {
				...userInitialState.reset,
				success: false,
				isRequested: false,
				hasError: true,
			},
		});
	});

	it('should handle reset initial', () => {
		expect(userReducer({
				...userInitialState,
				reset: {
					...userInitialState.reset,
					success: true,
					isRequested: false,
					hasError: false,
				},
			},
			UserActions.resetInitialAction()
		)).toEqual(userInitialState);
	});

	// register
	it('should handle register request', () => {
		expect(userReducer(
			userInitialState,
			UserActions.registerRequestAction()
		)).toEqual({
			...userInitialState,
			register: {
				...userInitialState.register,
				isRequested: true,
				hasError: false,
			},
		});
	});

	it('should handle register request success', () => {
		expect(userReducer({
				...userInitialState,
				register: {
					...userInitialState.register,
					isRequested: true,
					hasError: false,
				},
			},
			UserActions.registerSuccessAction()
		)).toEqual({
			...userInitialState,
			register: {
				...userInitialState.register,
				isRequested: false,
				hasError: false,
			},
		});
	});

	it('should handle register request failed', () => {
		const error = 'Ошибка при регистрации';
		expect(userReducer({
				...userInitialState,
				register: {
					...userInitialState.register,
					isRequested: false,
					hasError: false,
				},
			},
			UserActions.registerFailedAction(error)
		)).toEqual({
			...userInitialState,
			register: {
				...userInitialState.register,
				error,
				isRequested: false,
				hasError: true,
			},
		});
	});

	// login
	it('should handle login request', () => {
		expect(userReducer(
			userInitialState,
			UserActions.loginRequestAction()
		)).toEqual({
			...userInitialState,
			login: {
				...userInitialState.login,
				isRequested: true,
				hasError: false,
			},
		});
	});

	it('should handle login request success', () => {
		expect(userReducer({
				...userInitialState,
				login: {
					...userInitialState.login,
					isRequested: true,
					hasError: false,
				},
			},
			UserActions.loginSuccessAction()
		)).toEqual({
			...userInitialState,
			login: {
				...userInitialState.login,
				isRequested: false,
				hasError: false,
			},
		});
	});

	it('should handle login request failed', () => {
		const error = 'Ошибка при авторизации';
		expect(userReducer({
				...userInitialState,
				login: {
					...userInitialState.login,
					isRequested: false,
					hasError: false,
				},
			},
			UserActions.loginFailedAction(error)
		)).toEqual({
			...userInitialState,
			login: {
				...userInitialState.login,
				error,
				isRequested: false,
				hasError: true,
			},
		});
	});

	// fetch user
	it('should handle fetch user request', () => {
		expect(userReducer(
			userInitialState,
			UserActions.userDataRequestAction()
		)).toEqual({
			...userInitialState,
			fetchUser: {
				...userInitialState.fetchUser,
				isRequested: true,
				hasError: false,
			},
		});
	});

	it('should handle fetch user request success', () => {
		expect(userReducer({
				...userInitialState,
				fetchUser: {
					...userInitialState.fetchUser,
					isRequested: true,
					hasError: false,
				},
			},
			UserActions.userDataSuccessAction()
		)).toEqual({
			...userInitialState,
			fetchUser: {
				...userInitialState.fetchUser,
				isRequested: false,
				hasError: false,
			},
			authAttemptСompleted: true,
		});
	});

	it('should handle fetch user request failed', () => {
		const error = 'Ошибка при получении данных пользователя';
		expect(userReducer({
				...userInitialState,
				fetchUser: {
					...userInitialState.fetchUser,
					isRequested: false,
					hasError: false,
				},
			},
			UserActions.userDataFailedAction(error)
		)).toEqual({
			...userInitialState,
			fetchUser: {
				...userInitialState.fetchUser,
				error,
				isRequested: false,
				hasError: true,
			},
			authAttemptСompleted: true,
		});
	});

	// change user data
	it('should handle change user data request', () => {
		expect(userReducer(
			userInitialState,
			UserActions.changeUserDataRequestAction()
		)).toEqual({
			...userInitialState,
			changeUserData: {
				...userInitialState.changeUserData,
				isRequested: true,
				hasError: false,
			},
		});
	});

	it('should handle change user data request success', () => {
		expect(userReducer({
				...userInitialState,
				changeUserData: {
					...userInitialState.changeUserData,
					isRequested: true,
					hasError: false,
				},
			},
			UserActions.changeUserDataSuccessAction()
		)).toEqual({
			...userInitialState,
			changeUserData: {
				...userInitialState.changeUserData,
				isRequested: false,
				hasError: false,
			},
		});
	});

	it('should handle change user data request failed', () => {
		const error = 'Ошибка при изменении данных пользователя';
		expect(userReducer({
				...userInitialState,
				changeUserData: {
					...userInitialState.changeUserData,
					isRequested: false,
					hasError: false,
				},
			},
			UserActions.changeUserDataFailedAction(error)
		)).toEqual({
			...userInitialState,
			changeUserData: {
				...userInitialState.changeUserData,
				error,
				isRequested: false,
				hasError: true,
			},
		});
	});

	// logout
	it('should handle logout request', () => {
		expect(userReducer(
			userInitialState,
			UserActions.logoutRequestAction()
		)).toEqual({
			...userInitialState,
			logout: {
				...userInitialState.logout,
				isRequested: true,
				hasError: false,
			},
		});
	});

	it('should handle logout request success', () => {
		expect(userReducer({
				...userInitialState,
				logout: {
					...userInitialState.logout,
					isRequested: true,
					hasError: false,
				},
			},
			UserActions.logoutSuccessAction()
		)).toEqual({
			...userInitialState,
			logout: {
				...userInitialState.logout,
				isRequested: false,
				hasError: false,
			},
		});
	});

	it('should handle logout request failed', () => {
		const error = 'Ошибка при разавторизации';
		expect(userReducer({
				...userInitialState,
				logout: {
					...userInitialState.logout,
					isRequested: false,
					hasError: false,
				},
			},
			UserActions.logoutFailedAction(error)
		)).toEqual({
			...userInitialState,
			logout: {
				...userInitialState.logout,
				error,
				isRequested: false,
				hasError: true,
			},
		});
	});

	// set/clear user
	it('should handle set user', () => {
		expect(userReducer(
			userInitialState,
			UserActions.setUserAction(mockUser)
		)).toEqual({
			...userInitialState,
			user: mockUser,
			isAuth: true,
		});
	});

	it('should handle clear user', () => {
		expect(userReducer({
				...userInitialState,
				user: mockUser,
				isAuth: true,
			},
			UserActions.clearUserAction()
		)).toEqual(userInitialState);
	});
});
