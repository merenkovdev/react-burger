import { TItem } from '../../types/api';
import { requestIngredients } from '../api/ingredients';
import { AppThunk } from '../../types/redux';
import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_FAILED,
	SORT_INGREDIENTS,
	SET_ACTIVE_TAB,
	INCREASE_ADDED_INGREDIENT,
	DECREASE_ADDED_INGREDIENT,
	CLEAR_ADDED_INGREDIENT,
} from '../constants/ingredients';

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

export const getIngredientsRequestAction = (): TGetIngredientsRequestAction => ({
	type: GET_INGREDIENTS_REQUEST,
});

export const getIngredientsSuccessAction = (items: Array<TItem>): TGetIngredientsSuccessAction => ({
	type: GET_INGREDIENTS_SUCCESS,
	items,
});

export const getIngredientsFailedAction = (): TGetIngredientsFailedAction => ({
	type: GET_INGREDIENTS_FAILED,
});

export const sortIngredientsAction = (): TSortIngredientsAction => ({
	type: SORT_INGREDIENTS,
});

export const setActiveTabAction = (tab: string): TSetActiveTabAction => ({
	type: SET_ACTIVE_TAB,
	tab,
});

export const increaseAddedIngredientAction = (item: TItem): TIncreaseAddedIngredientAction => ({
	type: INCREASE_ADDED_INGREDIENT,
	item,
});

export const decreaseAddedIngredientAction = (item: TItem): TDecreaseAddedIngredientAction => ({
	type: DECREASE_ADDED_INGREDIENT,
	item,
});

export const clearAddedIngredientAction = (): TClearAddedIngredientAction => ({
	type: CLEAR_ADDED_INGREDIENT,
});

export const getIngredients: AppThunk = () => dispatch => {
	dispatch(getIngredientsRequestAction());
	requestIngredients()
		.then(response => {
			dispatch(getIngredientsSuccessAction(response.data));
		})
		.catch(() => {
			dispatch(getIngredientsFailedAction());
		});
};
