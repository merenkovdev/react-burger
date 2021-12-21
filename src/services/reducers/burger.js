import {
	ADD_BUN,
	ADD_TOPPING,
	CALC_TOTAL_PRICE,
} from '../actions/burger';

const burgerInitialState = {
	bun: {},
	toppings: [],
	totalPrice: 0,
};

const NUMBER_BUNS_IN_BURGERS = 2;

export const burgerReducer = (state = burgerInitialState, action) => {
	const getTotalPrice = () => (
		state.toppings.reduce(
			(acum, current) => acum + current.price,
			0
		) + (state.bun?.price * NUMBER_BUNS_IN_BURGERS || 0)
	);

	switch (action.type) {
		case CALC_TOTAL_PRICE:
			return {
				...state,
				totalPrice: getTotalPrice(),
			};
		case ADD_BUN:
			return {
				...state,
				bun: action.bun,
			};

		case ADD_TOPPING:
			return {
				...state,
				toppings: [ ...state.toppings, ...action.toppings ],
			};

		default:
			return state;
	}
};