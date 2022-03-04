import { combineReducers } from 'redux';
import { modalReducer } from './modal';
import { ingredientsReducer } from './ingredients';
import { burgerReducer } from './burger';
import { userReducer } from './user';
import { ordersReducer } from './orders';

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	burger: burgerReducer,
	modal: modalReducer,
	user: userReducer,
	orders: ordersReducer,
});
