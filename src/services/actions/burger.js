export const ADD_BUN = 'ADD_BUN';
export const ADD_TOPPING = 'ADD_TOPPING';
export const REMOVE_IMGREDIENT = 'REMOVE_IMGREDIENT';
export const CALC_TOTAL_PRICE = 'CALC_TOTAL_PRICE';

export const addIngredient = (id) => (dispatch, getState) => {
	const {
		ingredients: {
			items,
		}
	} = getState();

	const ingredient = items.find(item => item._id === id);

	switch (ingredient.type) {
		case 'bun':
			dispatch({ type: ADD_BUN, ingredient });
			break;

		case 'main':
		case 'sauce':
			dispatch({ type: ADD_TOPPING, ingredient });
			break;

		default:
			console.warn('Ингредиент не найден');
			break;
	}
};
