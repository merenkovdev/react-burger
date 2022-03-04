import {
	TypedUseSelectorHook,
	useSelector as selectorHook,
	useDispatch as dispatchHook,
} from 'react-redux';
import { AppDispatch, AppThunk, RootState } from '../types/redux';

import { TOrder, TItem } from '../types/api';

import { getTotalPrice } from '../services/helpers';

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();

export const useSelectorOrderIngredients = (order: TOrder): {
	ingredients: TItem[],
	price: number,
} => {
	const ingredients = useSelector(store => store.ingredients.items);
	const orderIngredients: TItem[] = [];

	order.ingredients.forEach(id => {
		const ingredient = ingredients.find(ingredient => ingredient._id === id);
		if (ingredient) {
			orderIngredients.push(ingredient);
		}
	});

	return {
		ingredients: orderIngredients,
		price: getTotalPrice(orderIngredients),
	};
};