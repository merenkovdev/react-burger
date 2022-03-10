import { nanoid  } from 'nanoid';
import { TItem } from '../../types/api';
import { TTopping } from './../../types/ingredient';
import { AppThunk } from '../../types/redux';

import {
	ADD_BUN,
	ADD_TOPPING,
	REMOVE_IMGREDIENT,
	MOVE_INGREDIENT,
	CLEAR_CONSTRUCTOR,
	CALC_TOTAL_PRICE,
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_FAILED,
} from '../constants/burger';

import { getTotalPrice } from '../helpers';
import { requestCreateOrder } from '../api/order';

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
	readonly error?: string;
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

export const addBunAction = (ingredient: TItem): TAddBunAction => ({
	type: ADD_BUN,
	ingredient,
});

export const addToppingAction = (ingredient: TItem, uid: string): TAddToppingAction => ({
	type: ADD_TOPPING,
	ingredient,
	uid,
});

export const removeIngredientAction = (uid: string): TRemoveIngredientAction => ({
	type: REMOVE_IMGREDIENT,
	uid,
});

export const moveIngredientAction = (movedTo: number, movedFrom: number): TMoveIngredientAction => ({
	type: MOVE_INGREDIENT,
	movedTo,
	movedFrom,
});

export const clearConstructorAction = (): TClearConstructorAction => ({
	type: CLEAR_CONSTRUCTOR,
});

export const calcTotalPrice = (ingredients: TItem[]): TCalcTotalPriceAction => {
	return {
		type: CALC_TOTAL_PRICE,
		payload: getTotalPrice(ingredients),
	};
};

export const createOrderRequestAction = (): TCreateOrderRequestAction => ({
	type: CREATE_ORDER_REQUEST,
});

export const createOrderSuccessAction = (
	name: string,
	number: number
): TCreateOrderSuccessAction => ({
	type: CREATE_ORDER_SUCCESS,
	name,
	number,
});

export const createOrderFailedAction = (error?: string): TCreateOrderFailedAction => ({
	type: CREATE_ORDER_FAILED,
	error,
});

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
			dispatch(addBunAction(ingredient));
			break;

		case 'main':
		case 'sauce':
			dispatch(addToppingAction(ingredient, uid));
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
		dispatch(createOrderFailedAction());

		return;
	}

	dispatch(createOrderRequestAction());

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

			dispatch(createOrderSuccessAction(name, number));
		})
		.catch(() => dispatch(createOrderFailedAction()));
};
