import { combineReducers } from 'redux';
import { modalReducer } from './modal';
import { ingredientsReducer } from './ingredients';
import { burgerReducer } from './burger';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	burger: burgerReducer,
	order: orderReducer,
	modal: modalReducer,
});
