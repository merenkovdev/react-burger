import { nanoid  } from 'nanoid';
// import {
// 	ADD_BUN,
// 	ADD_TOPPING,
// 	REMOVE_IMGREDIENT,
// 	MOVE_INGREDIENT,
// 	CLEAR_CONSTRUCTOR,
// 	CALC_TOTAL_PRICE,
// } from '../constants/burger';
import { TItem } from '../../types/api';
import { AppThunk } from '../../types/redux';

export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const ADD_TOPPING: 'ADD_TOPPING' = 'ADD_TOPPING';
export const REMOVE_IMGREDIENT: 'REMOVE_IMGREDIENT' = 'REMOVE_IMGREDIENT';
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT';
export const CLEAR_CONSTRUCTOR: 'CLEAR_CONSTRUCTOR' = 'CLEAR_CONSTRUCTOR';
export const CALC_TOTAL_PRICE: 'CALC_TOTAL_PRICE' = 'CALC_TOTAL_PRICE';

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
};

export type TBurgerActions =
	TAddBunAction
	| TAddToppingAction
	| TCalcTotalPriceAction
	| TClearConstructorAction
	| TMoveIngredientAction
	| TRemoveIngredientAction
;

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
