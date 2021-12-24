import {
	ADD_BUN,
	ADD_TOPPING,
	REMOVE_IMGREDIENT,
	CALC_TOTAL_PRICE,
	MOVE_INGREDIENT,
} from '../actions/burger';
import { nanoid  } from 'nanoid';

const burgerInitialState = {
	bun: {},
	toppings: [],
	totalPrice: 0,
};

const NUMBER_BUNS_IN_BURGERS = 2;

const moveArrayElement = (array, to, from) => {
	const copyArray = [...array];
	const movedElem = copyArray.splice(from, 1);

	return [
		...copyArray.slice(0, to),
		...movedElem,
		...copyArray.slice(to),
	];
};

const getTotalPrice = (toppings, bun) => (
	toppings.reduce(
		(acum, current) => acum + current.price,
		0
	) + (bun?.price * NUMBER_BUNS_IN_BURGERS || 0)
);

export const burgerReducer = (state = burgerInitialState, action) => {
	switch (action.type) {
		case CALC_TOTAL_PRICE:
			return {
				...state,
				totalPrice: getTotalPrice(state.toppings, state.bun),
			};
		case ADD_BUN:
			return {
				...state,
				bun: action.ingredient,
			};

		case ADD_TOPPING:
			return {
				...state,
				toppings: [
					...state.toppings,
					{
						...action.ingredient,
						uid: nanoid(),
					},
				],
			};

		case REMOVE_IMGREDIENT:
			return {
				...state,
				toppings: state.toppings.filter(topping => topping.uid !== action.uid),
			};


		case MOVE_INGREDIENT: 
			const { movedTo, movedFrom } = action;

			return {
				...state,
				toppings: moveArrayElement(state.toppings, movedTo, movedFrom),
			};

		default:
			return state;
	}
};
