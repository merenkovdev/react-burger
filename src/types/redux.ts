import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import { TBurgerActions } from './../services/actions/burger';
import { TIngredientsActions } from './../services/actions/ingredients';
import { TModalActions } from './../services/actions/modal';
import { TOrderActions } from './../services/actions/order';
import { TUserActions } from './../services/actions/user';

import {
	TSortIngredients,
	TTopping,
	TAddedIngredients,
} from './ingredient';
import { TItem, TUser } from './api';

import store from '../services/store';

export type TBurgerState = {
	bun: TItem | null;
	toppings: TTopping[] | [];
	totalPrice: number;
};

export type TModalState = {
	active: string;
};

export type TOrderState = {
	number: number;
	name: string;
	success: boolean;
	isRequested: boolean;
	hasError: boolean;
	textError: string;
};

export type TIngredientsState = {
	isRequested: boolean;
	hasError: boolean;
	items: Array<TItem>;
	sortedItems: TSortIngredients;
	activeTab: string;
	addedIngredients: TAddedIngredients;
};

export type TRequestState = {
	isRequested: boolean;
	hasError: boolean;
	error: string;
};

export type TUserState = {
	login: TRequestState;
	register: TRequestState;
	logout: TRequestState;
	fetchUser: TRequestState;
	changeUserData: TRequestState;
	reset: TRequestState & { success: boolean };
	forgot: TRequestState & { success: boolean };
	user: TUser;
	isAuth: boolean;
	authAttemptSucceeded: boolean;
};

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions =
	TBurgerActions
	| TIngredientsActions
	| TModalActions
	| TOrderActions
	| TUserActions
;

export type AppThunk<ReturnType = void> = ActionCreator<
	ThunkAction<ReturnType, RootState, Action, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;
