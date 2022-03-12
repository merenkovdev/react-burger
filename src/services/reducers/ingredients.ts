import {
	TIngredientsActions,
} from '../actions/ingredients';

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

import type { TIngredientsState } from '../../types/redux';
import { TItem } from '../../types/api';
import { TAddedIngredients, TSortIngredients } from '../../types/ingredient';

export const ingredientsInitialState: TIngredientsState = {
	isRequested: false,
	hasError: false,
	items: [],
	sortedItems: {},
	activeTab: 'bun',
	addedIngredients: {},
};

const sortIngredients = (ingredients: Array<TItem>) => (
	ingredients.reduce((acum: TSortIngredients, current) => {
		if (current.type && !acum[current.type]) {
			acum[current.type] = [];
		}

		if (acum[current.type]) {
			acum[current.type].push(current);
		}

		return acum;
	}, {})
);

const changeValue = (value: number, count: number) => {
	if (Number.isInteger(value)) {
		return value + count;
	}

	return count;
};

const getAddedIngredients = (
	items: TAddedIngredients,
	item: TItem,
	count: number
): TAddedIngredients => {
	const copyItems = { ...items };

	switch (item.type) {
		case 'bun':
			const key = Object.keys(copyItems)
				.find(id => copyItems[id]?.type === 'bun');

			if (key && copyItems[key]) {
				delete copyItems[key];
			}

			copyItems[item._id] = {
				type: item.type,
				count: 2,
			};

			return copyItems;

		case 'main':
		case 'sauce':
			const value = changeValue(
				items[item._id]?.count,
				count,
			);

			if (!value) {
				delete copyItems[item._id];

				return copyItems;
			}

			return {
				...items,
				[item._id]: {
					type: item.type,
					count: value,
				}
			};

		default:
			return items;
	}
};

export const ingredientsReducer = (
	state = ingredientsInitialState,
	action: TIngredientsActions
): TIngredientsState => {
	switch (action.type) {
		case GET_INGREDIENTS_REQUEST:
			return {
				...state,
				isRequested: true,
				hasError: false,
			};

		case GET_INGREDIENTS_SUCCESS:
			return {
				...state,
				isRequested: false,
				hasError: false,
				items: action.items,
			};

		case GET_INGREDIENTS_FAILED:
			return {
				...state,
				isRequested: false,
				hasError: true,
			};

		case SORT_INGREDIENTS:
			return {
				...state,
				sortedItems: sortIngredients(state.items),
			};

		case SET_ACTIVE_TAB:
			return {
				...state,
				activeTab: action.tab,
			};

		case INCREASE_ADDED_INGREDIENT:
			return {
				...state,
				addedIngredients: getAddedIngredients(
					state.addedIngredients,
					action.item,
					1
				),
			};

		case DECREASE_ADDED_INGREDIENT:
			return {
				...state,
				addedIngredients: getAddedIngredients(
					state.addedIngredients,
					action.item,
					-1
				),
			};

		case CLEAR_ADDED_INGREDIENT:
			return {
				...state,
				addedIngredients: ingredientsInitialState.addedIngredients,
			};
		default:
			return state;
	}
};
