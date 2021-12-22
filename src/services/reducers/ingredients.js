import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_FAILED,
	SET_INGREDIENTS_DETAILS,
	CLEAR_INGREDIENTS_DETAILS,
	SORT_INGREDIENTS,
	SET_ACTIVE_TAB,
} from '../actions/ingredients';

const ingredientsInitialState = {
	isRequested: false,
	hasError: false,
	items: [],
	sortedItems: {},
	ingredientDetails: null,
	activeTab: 'bun',
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

		default:
			return state;
	}
};
