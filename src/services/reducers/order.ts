import {
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_FAILED,
	TOrderActions,
} from '../actions/order';

import { TOrderState } from '../../types/redux';

const orderInitialState: TOrderState = {
	number: 0,
	name: '',
	success: false,
	isRequested: false,
	hasError: false,
	textError: '',
};

export const orderReducer = (
	state = orderInitialState,
	action: TOrderActions
): TOrderState => {
	switch (action.type) {
		case CREATE_ORDER_REQUEST:
			return {
				...state,
				isRequested: true,
				hasError: false,
				success: false,
			};

		case CREATE_ORDER_SUCCESS:
			const { number, name } = action;

			return {
				...state,
				number,
				name,
				success: true,
				isRequested: false,
				hasError: false,
			};

		case CREATE_ORDER_FAILED:
			return {
				...state,
				success: false,
				isRequested: false,
				hasError: true,
			};

		default:
			return state;
	}
};