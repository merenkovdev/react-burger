import {
	CHANGE_VALUE,
	FORM_REQUEST,
	FORM_SUCCESS,
	FORM_FAILED,
} from '../actions/forms';
import {
	FORM_NAME_FORGOT_PASSWORD,
	FORM_NAME_RESET_PASSWORD,
	FORM_NAME_LOGIN,
	FORM_NAME_REGISTER,
} from '../../utils/constants';

const formsInitialState = {
	[FORM_NAME_FORGOT_PASSWORD]: {
		isRequested: false,
		hasError: false,
		email: '',
	},
	[FORM_NAME_RESET_PASSWORD]: {
		isRequested: false,
		hasError: false,
		password: '',
		token: '',
	},
	[FORM_NAME_REGISTER]: {},
	[FORM_NAME_LOGIN]: {},
};

export const formReducer = (state = formsInitialState, action) => {
	switch (action.type) {
		case CHANGE_VALUE: {
			const {
				formName,
				name,
				value,
			} = action;

			return {
				...state,
				[formName]: {
					...state[formName],
					[name]: value,
				},
			};
		};

		case FORM_REQUEST: {
			const {
				formName,
			} = action;

			return {
				...state,
				[formName]: {
					...state[formName],
					isRequested: true,
					hasError: false,
				},
			};
		};

		case FORM_SUCCESS: {
			const {
				formName,
				data,
			} = action;

			return {
				...state,
				[formName]: {
					...state[formName],
					data,
					isRequested: false,
					hasError: false,
				},
			};
		};

		case FORM_FAILED: {
			const {
				formName,
			} = action;

			return {
				...state,
				[formName]: {
					...state[formName],
					isRequested: false,
					hasError: true,
				},
			};
		};

		default:
			return state;
	}
};
