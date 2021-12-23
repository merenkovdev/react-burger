import { getDataRequest } from '../../utils/utils';
import { API_INGREDIENTS } from '../../utils/constants';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const SET_INGREDIENTS_DETAILS = 'SET_INGREDIENTS_DETAILS';
export const CLEAR_INGREDIENTS_DETAILS = 'CLEAR_INGREDIENTS_DETAILS';
export const SORT_INGREDIENTS = 'SORT_INGREDIENTS';
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
export const INCREASE_ADDED_INGREDIENT = 'INCREASE_ADDED_INGREDIENT';
export const DECREASE_ADDED_INGREDIENT = 'DECREASE_ADDED_INGREDIENT';

export const getIngredients = () => dispatch => {
	getDataRequest(API_INGREDIENTS)
		.then(response => {
			dispatch({ type: GET_INGREDIENTS_SUCCESS, items: response.data });
		})
		.catch(() => {
			dispatch({ type: GET_INGREDIENTS_FAILED });
		});

};

export const changeCountAddedIngredients = (item, typeChange) => (dispatch) => {
	switch (typeChange) {
		case 'increase':
			dispatch({
				type: INCREASE_ADDED_INGREDIENT,
				item: item._id,
				count: 1,
			});
			break;

		case 'decrease':
			dispatch({
				type: DECREASE_ADDED_INGREDIENT,
				_id: item._id,
				count: -1,
			});
			break;

		default:
			break;
	}
};