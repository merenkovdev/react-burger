import { TTopping } from './../../types/ingredient';
import { TItem } from './../../types/api';
import { AppThunk } from '../../types/redux';

import { requestCreateOrder } from '../api/order';

export const CREATE_ORDER_REQUEST: 'CREATE_ORDER_REQUEST' = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS: 'CREATE_ORDER_SUCCESS' = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED: 'CREATE_ORDER_FAILED' = 'CREATE_ORDER_FAILED';

export type TCreateOrderRequestAction = {
	readonly type: typeof CREATE_ORDER_REQUEST;
};

export type TCreateOrderSuccessAction = {
	readonly type: typeof CREATE_ORDER_SUCCESS;
	readonly name: string;
	readonly number: number;
};

export type TCreateOrderFailedAction = {
	readonly type: typeof CREATE_ORDER_FAILED;
};

export type TOrderActions =
	TCreateOrderRequestAction
	| TCreateOrderSuccessAction
	| TCreateOrderFailedAction;

const getIngredientsIds = (bun: TItem, toppings: TTopping[]) => (
	[ bun._id, ...toppings.map(topping => topping._id) ]
);

export const createOrder: AppThunk = () => async (dispatch, getState) => {
	const {
		burger: {
			bun,
			toppings,
		},
	} = getState();

	if (!bun) {
		dispatch({ type: CREATE_ORDER_FAILED });

		return;
	}

	dispatch({ type: CREATE_ORDER_REQUEST });

	requestCreateOrder({
		ingredients: getIngredientsIds(bun, toppings),
	})
		.then(response => {
			const {
				name,
				order: {
					number,
				},
			} = response;
			dispatch({ type: CREATE_ORDER_SUCCESS, name, number });
		})
		.catch(() => dispatch({ type: CREATE_ORDER_FAILED }));
};
