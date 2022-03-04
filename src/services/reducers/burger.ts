import {
	ADD_BUN,
	ADD_TOPPING,
	REMOVE_IMGREDIENT,
	CALC_TOTAL_PRICE,
	MOVE_INGREDIENT,
	CLEAR_CONSTRUCTOR,
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_FAILED,
	TBurgerActions,
} from '../actions/burger';

import { TTopping } from '../../types/ingredient';
import { TBurgerState } from '../../types/redux';

const burgerInitialState: TBurgerState = {
	bun: null,
	toppings: [],
	totalPrice: 0,
	order: {
		number: 0,
		name: '',
		success: false,
		isRequested: false,
		hasError: false,
		textError: '',
	},
};

const moveArrayElement = (array: TTopping[], to: number, from: number) => {
	const copyArray = [...array];
	const movedElem = copyArray.splice(from, 1);

	return [
		...copyArray.slice(0, to),
		...movedElem,
		...copyArray.slice(to),
	];
};

export const burgerReducer = (
	state = burgerInitialState,
	action: TBurgerActions
): TBurgerState => {
	switch (action.type) {
		case CALC_TOTAL_PRICE:
			return {
				...state,
				totalPrice: action.payload,
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

		case CREATE_ORDER_REQUEST:
			return {
				...state,
				order: {
					...state.order,
					isRequested: true,
					hasError: false,
					success: false,
				}
			};

		case CREATE_ORDER_SUCCESS:
			const { number, name } = action;

			return {
				...state,
				order: {
					...state.order,
					number,
					name,
					success: true,
					isRequested: false,
					hasError: false,
				},
			};

		case CREATE_ORDER_FAILED:
			return {
				...state,
				order: {
					...state.order,
					success: false,
					isRequested: false,
					hasError: true,
				},
			};

		default:
			return state;
	}
};
