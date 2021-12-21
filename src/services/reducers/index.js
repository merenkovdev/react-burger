import { combineReducers } from 'redux';
import { modalReducer } from './modal';

export const rootReducer = combineReducers({
	modal: modalReducer,
});