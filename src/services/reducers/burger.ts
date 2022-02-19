import {
	ADD_BUN,
	ADD_TOPPING,
	REMOVE_IMGREDIENT,
	CALC_TOTAL_PRICE,
	MOVE_INGREDIENT,
	CLEAR_CONSTRUCTOR,
	TBurgerActions,
} from '../actions/burger';

import { TItem } from '../../types/api';
import { TTopping } from '../../types/ingredient';
import { TBurgerState } from '../../types/redux';

const burgerInitialState: TBurgerState = {
	bun: null,
	toppings: [],
	totalPrice: 0,
};

const NUMBER_BUNS_IN_BURGERS = 2;

const moveArrayElement = (array: TTopping[], to: number, from: number) => {
	const copyArray = [...array];
	const movedElem = copyArray.splice(from, 1);

	return [
		...copyArray.slice(0, to),
		...movedElem,
		...copyArray.slice(to),
	];
};

const getTotalPrice = (toppings: TTopping[], bun: TItem | null) => {
	const bunPrice = bun ? bun.price * NUMBER_BUNS_IN_BURGERS : 0;

	return toppings.reduce(
		(acum, current) => acum + current.price,
		0
	) + bunPrice;
};

export const burgerReducer = (
	state = burgerInitialState,
	action: TBurgerActions
): TBurgerState => {
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
						uid: action.uid,
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

		case CLEAR_CONSTRUCTOR:
			return {
				...state,
				toppings: burgerInitialState.toppings,
				bun: burgerInitialState.bun,
			};

		default:
			return state;
	}
};
