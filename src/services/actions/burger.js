import { nanoid  } from 'nanoid';

export const ADD_BUN = 'ADD_BUN';
export const ADD_TOPPING = 'ADD_TOPPING';
export const REMOVE_IMGREDIENT = 'REMOVE_IMGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';
export const CALC_TOTAL_PRICE = 'CALC_TOTAL_PRICE';

export const addIngredient = (id) => (dispatch, getState) => {
	const {
		ingredients: {
			items,
		}
	} = getState();

	const ingredient = items.find(item => item._id === id);
	const uid = nanoid();

	switch (ingredient.type) {
		case 'bun':
			dispatch({ type: ADD_BUN, ingredient, uid });
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
