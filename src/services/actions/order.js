import { getDataRequest } from '../../utils/utils';
import { API_ORDERS } from '../../utils/constants';

export const CREATE_ORDER = 'CREATE_ORDER';
export const CREATE_ORDER_ERROR = 'CREATE_ORDER_ERROR';

export const createOrder = (data) => (dispatch) => {
	return getDataRequest(API_ORDERS, data)
		.then(response => {
			const {
				name,
				order: {
					number,
				},
			} = response;
			dispatch({ type: CREATE_ORDER, name, number });
		})
		.catch(() => {
			dispatch({ type: CREATE_ORDER_ERROR });
		});
};
