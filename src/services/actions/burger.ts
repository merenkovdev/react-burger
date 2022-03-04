import { nanoid  } from 'nanoid';
import { TItem } from '../../types/api';
import { TTopping } from './../../types/ingredient';
import { AppThunk } from '../../types/redux';

import { getTotalPrice } from '../helpers';
import { requestCreateOrder } from '../api/order';

export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const ADD_TOPPING: 'ADD_TOPPING' = 'ADD_TOPPING';
export const REMOVE_IMGREDIENT: 'REMOVE_IMGREDIENT' = 'REMOVE_IMGREDIENT';
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT';
export const CLEAR_CONSTRUCTOR: 'CLEAR_CONSTRUCTOR' = 'CLEAR_CONSTRUCTOR';
export const CALC_TOTAL_PRICE: 'CALC_TOTAL_PRICE' = 'CALC_TOTAL_PRICE';

export const CREATE_ORDER_REQUEST: 'CREATE_ORDER_REQUEST' = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS: 'CREATE_ORDER_SUCCESS' = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED: 'CREATE_ORDER_FAILED' = 'CREATE_ORDER_FAILED';

export type TAddBunAction = {
	readonly type: typeof ADD_BUN;
	readonly ingredient: TItem;
};

export type TAddToppingAction = {
	readonly type: typeof ADD_TOPPING;
	readonly ingredient: TItem;
	readonly uid: string;
};

export type TRemoveIngredientAction = {
	readonly type: typeof REMOVE_IMGREDIENT;
	readonly uid: string;
};

export type TMoveIngredientAction = {
	readonly type: typeof MOVE_INGREDIENT;
	readonly movedTo: number;
	readonly movedFrom: number;
};

export type TClearConstructorAction = {
	readonly type: typeof CLEAR_CONSTRUCTOR;
};

export type TCalcTotalPriceAction = {
	readonly type: typeof CALC_TOTAL_PRICE;
	readonly payload: number;
};

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

export type TBurgerActions =
	TAddBunAction
	| TAddToppingAction
	| TCalcTotalPriceAction
	| TClearConstructorAction
	| TMoveIngredientAction
	| TRemoveIngredientAction
	| TCreateOrderRequestAction
	| TCreateOrderSuccessAction
	| TCreateOrderFailedAction
;

export const calcTotalPrice = (ingredients: TItem[]): TCalcTotalPriceAction => {
	return {
		type: CALC_TOTAL_PRICE,
		payload: getTotalPrice(ingredients),
	};
};

export const addIngredient: AppThunk = (id: string) => (dispatch, getState) => {
	const {
		ingredients: {
			items,
		}
	} = getState();
	const ingredient = items.find(item => item._id === id);

	if (!ingredient) {
		return;
	}

	const uid = nanoid();

	switch (ingredient.type) {
		case 'bun':
			dispatch({ type: ADD_BUN, ingredient });
			break;

		case 'main':
		case 'sauce':
			dispatch({ type: ADD_TOPPING, ingredient, uid });
			break;

		default:
			console.warn('Ингредиент не найден');
			break;
	}
};

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
