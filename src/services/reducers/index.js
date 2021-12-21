import { combineReducers } from 'redux';
import { modalReducer } from './modal';
import { ingredientsReducer } from './ingredients';
import { burgerReducer } from './burger';

export const rootReducer = combineReducers({
	modal: modalReducer,
	ingredients: ingredientsReducer,
	burger: burgerReducer,
});