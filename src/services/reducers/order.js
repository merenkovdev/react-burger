import {
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_FAILED,
} from '../actions/order';

const orderInitialState = {
	number: 0,
	name: '',
	isRequested: false,
	hasError: false,
	textError: '',
};

export const orderReducer = (state = orderInitialState, action) => {
	switch (action.type) {
		case CREATE_ORDER_REQUEST:
			return {
				...state,
				isRequested: true,
				hasError: false,
			};

		case CREATE_ORDER_SUCCESS:
			const { number, name } = action;

			return {
				...state,
				number,
				name,
				isRequested: false,
				hasError: false,
			};

		case CREATE_ORDER_FAILED:
			return {
				...state,
				isRequested: false,
				hasError: true,
				textError: action.textError,
			};

		default:
			return state;
	}
};