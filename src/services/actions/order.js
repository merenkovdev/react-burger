import { requestCreateOrder } from '../api/order';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';

const getIngredientsIds = (bun, toppings) => (
	[ bun._id, ...toppings.map(topping => topping._id) ]
);

export const createOrder = () => async (dispatch, getState) => {
	const {
		burger: {
			bun,
			toppings,
		},
	} = getState();

	dispatch({ type: CREATE_ORDER_REQUEST });

	requestCreateOrder({
		ingredients: getIngredientsIds(bun, toppings),
	})
		.then(response => {
			const {
				name,
				order: {
					number,
				},
			} = response;
			dispatch({ type: CREATE_ORDER_SUCCESS, name, number });
		})
		.catch(() => dispatch({ type: CREATE_ORDER_FAILED }));
};
