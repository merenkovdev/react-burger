import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_FAILED,
	SET_INGREDIENTS_DETAILS,
	CLEAR_INGREDIENTS_DETAILS,
	SORT_INGREDIENTS,
	SET_ACTIVE_TAB,
	INCREASE_ADDED_INGREDIENT,
	DECREASE_ADDED_INGREDIENT,
} from '../actions/ingredients';

const ingredientsInitialState = {
	isRequested: false,
	hasError: false,
	items: [],
	sortedItems: {},
	ingredientDetails: null,
	activeTab: 'bun',
	addedIngredients: {},
};

const sortIngredients = (ingredients) => (
	ingredients.reduce((acum, current) => {
		if (current.type && !acum[current.type]) {
			acum[current.type] = [];
		}

		if (acum[current.type]) {
			acum[current.type].push(current);
		}

		return acum;
	}, {})
);

const changeValue = (value, count) => {
	if (Number.isInteger(value)) {
		return value + count;
	}

	return count;
};

const getAddedIngredients = (items, { item }, count) => {
	const copyItems = { ...items };

	switch (item.type) {
		case 'bun':
			const key = Object.keys(copyItems)
				.find(id => copyItems[id]?.type === 'bun');
			delete copyItems[key];

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

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
	switch (action.type) {
		case SET_INGREDIENTS_DETAILS:
			const ingredientDetails = state.items.find(item => item._id === action.id);

			return {
				...state,
				ingredientDetails,
			};

		case CLEAR_INGREDIENTS_DETAILS:

			return {
				...state,
				ingredientDetails: null,
			};

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
					action,
					1
				),
			};

		case DECREASE_ADDED_INGREDIENT:
			return {
				...state,
				addedIngredients: getAddedIngredients(
					state.addedIngredients,
					action,
					-1
				),
			};

		default:
			return state;
	}
};
