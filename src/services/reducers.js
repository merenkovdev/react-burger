import { MODAL_ORDER, MODAL_DETAILS } from '../utils/constants';

const modalReducer = (state, action) => {
	switch (action.type) {
		case MODAL_ORDER:
			return {
				modal: MODAL_ORDER,
			};

		case MODAL_DETAILS:
			return {
				modal: MODAL_DETAILS,
			}

		case 'hide':
			return {
				modal: '',
			}

		default:
			return state;
	}
};

const dataReducer = (state, action) => {
	switch (action.type) {
		case 'item-details':
			const itemDetails = state.ingredients.find(item => item._id === action.payload);

			return {
				...state,
				itemDetails,
			};

		case 'start-fetch':
			return {
				...state,
				isLoading: true,
				hasError: false,
			};

		case 'done-fetch':
			return {
				...state,
				isLoading: false,
				hasError: false,
				ingredients: action.payload,
			};


		case 'fail-fetch':
			return {
				...state,
				isLoading: false,
				hasError: true,
			};

		default:
			return state;
	}
};

const burgerReducer = (state, action) => {
	const getTotalPrice = () => (
		state.toppings.reduce(
			(acum, current) => acum + current.price,
			0
		) + (state.bun?.price*2 || 0)
	);

	switch (action.type) {
		case 'calc-total-price':
			return {
				...state,
				totalPrice: getTotalPrice(),
			};
		case 'add-bun':
			return {
				...state,
				bun: action.payload,
			};

		case 'add-toppings':
			return {
				...state,
				toppings: [ ...state.toppings, ...action.payload ],
			};

		default:
			return state;
	}
};

const orderReducer = (state, action) => {
	switch (action.type) {
		case 'create-order':
			const { number, name } = action.payload;
			return {
				...state,
				number,
				name,
			};

		case 'create-order-error':
			return {
				...state,
				error: true,
			};

		default:
			return state;
	}
};

export {
	modalReducer,
	dataReducer,
	burgerReducer,
	orderReducer,
};
