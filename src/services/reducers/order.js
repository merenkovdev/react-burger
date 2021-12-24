import {
	CREATE_ORDER,
	CREATE_ORDER_ERROR,
} from '../actions/order';

const orderInitialState = {
	number: 0,
	name: '',
};

export const orderReducer = (state = orderInitialState, action) => {
	switch (action.type) {
		case CREATE_ORDER:
			const { number, name } = action;
			return {
				...state,
				number,
				name,
				error: false,
			};

		case CREATE_ORDER_ERROR:
			return {
				...state,
				error: true,
			};

		default:
			return state;
	}
};