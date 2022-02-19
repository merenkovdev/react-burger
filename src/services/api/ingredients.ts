import { API_INGREDIENTS } from '../../utils/constants';
import { checkResponse } from '../../utils/utils';
import { TResponseIngredients } from '../../types/api';

const requestIngredients = async (): Promise<TResponseIngredients> => {
	try {
		const response = await fetch(API_INGREDIENTS);

		return checkResponse<TResponseIngredients>(response);
	} catch (error) {
		return Promise.reject(error);
	}
};

export {
	requestIngredients,
};
