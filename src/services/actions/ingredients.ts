import { TItem } from '../../types/api';
import { requestIngredients } from '../api/ingredients';
import { AppThunk } from '../../types/redux';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';
export const SORT_INGREDIENTS: 'SORT_INGREDIENTS' = 'SORT_INGREDIENTS';
export const SET_ACTIVE_TAB: 'SET_ACTIVE_TAB' = 'SET_ACTIVE_TAB';
export const INCREASE_ADDED_INGREDIENT: 'INCREASE_ADDED_INGREDIENT' = 'INCREASE_ADDED_INGREDIENT';
export const DECREASE_ADDED_INGREDIENT: 'DECREASE_ADDED_INGREDIENT' = 'DECREASE_ADDED_INGREDIENT';
export const CLEAR_ADDED_INGREDIENT: 'CLEAR_ADDED_INGREDIENT' = 'CLEAR_ADDED_INGREDIENT';

export type TGetIngredientsRequestAction = {
	readonly type: typeof GET_INGREDIENTS_REQUEST;
};

export type TGetIngredientsSuccessAction = {
	readonly type: typeof GET_INGREDIENTS_SUCCESS;
	readonly items: Array<TItem>;
};

export type TGetIngredientsFailedAction = {
	readonly type: typeof GET_INGREDIENTS_FAILED;
};

export type TSortIngredientsAction = {
	readonly type: typeof SORT_INGREDIENTS;
};

export type TSetActiveTabAction = {
	readonly type: typeof SET_ACTIVE_TAB;
	readonly tab: string;
};

export type TIncreaseAddedIngredientAction = {
	readonly type: typeof INCREASE_ADDED_INGREDIENT;
	readonly item: TItem;
};

export type TDecreaseAddedIngredientAction = {
	readonly type: typeof DECREASE_ADDED_INGREDIENT;
	readonly item: TItem;
};

export type TClearAddedIngredientAction = {
	readonly type: typeof CLEAR_ADDED_INGREDIENT;
};

export type TIngredientsActions =
	TGetIngredientsRequestAction
	| TGetIngredientsSuccessAction
	| TGetIngredientsFailedAction
	| TSortIngredientsAction
	| TSetActiveTabAction
	| TIncreaseAddedIngredientAction
	| TDecreaseAddedIngredientAction
	| TClearAddedIngredientAction
;

export const getIngredients: AppThunk = () => dispatch => {
	requestIngredients()
		.then(response => {
			dispatch({
				type: GET_INGREDIENTS_SUCCESS,
				items: response.data,
			});
		})
		.catch(() => {
			dispatch({ type: GET_INGREDIENTS_FAILED });
		});
};
