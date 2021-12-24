import { getDataRequest, isEmpty } from '../../utils/utils';
import { API_ORDERS } from '../../utils/constants';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';

const getIngredientsIds = (bun, toppings) => (
	[ bun._id, ...toppings.map(topping => topping._id) ]
);

export const createOrder = () => (dispatch, getState) => {
	const { 
		burger: {
			bun,
			toppings,
		},
	} = getState();

	if (isEmpty(bun)) {
		const textError = 'Пожалуйста, добавьте булку';

		dispatch({
			textError,
			type: CREATE_ORDER_FAILED,
		});

		return Promise.reject(textError);
	}

	dispatch({ type: CREATE_ORDER_REQUEST });

	return getDataRequest(
			API_ORDERS,
			{
				ingredients: getIngredientsIds(bun, toppings),
			}
		)
			.then(response => {
				const {
					name,
					order: {
						number,
					},
				} = response;
				dispatch({ type: CREATE_ORDER_SUCCESS, name, number });
			})
			.catch(() => {
				dispatch({ type: CREATE_ORDER_FAILED });
			});
};
