import { API_INGREDIENTS } from '../../utils/constants';
import { checkResponse } from '../../utils/utils';
import { TItem } from '../../types/api';

const requestIngredients  = async (): Promise<Array<TItem>> => {
	try {
		const response = await fetch(API_INGREDIENTS);

		return checkResponse<Array<TItem>>(response);
	} catch (error) {
		return Promise.reject(error);
	}
};

export {
	requestIngredients,
};
