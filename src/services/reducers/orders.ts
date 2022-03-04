import { TWSOrdersUserActions } from './../actions/ws-orders-user-actions';
import {
	WS_ORDERS_ALL_CONNECTION_SUCCESS,
	WS_ORDERS_ALL_CONNECTION_ERROR,
	WS_ORDERS_ALL_CONNECTION_CLOSED,
	WS_ORDERS_ALL_GET_MESSAGE,
	WS_ORDERS_USER_CONNECTION_SUCCESS,
	WS_ORDERS_USER_CONNECTION_ERROR,
	WS_ORDERS_USER_CONNECTION_CLOSED,
	WS_ORDERS_USER_GET_MESSAGE,
} from '../constants/socket';
import { TWSOrdersAllActions } from '../actions/ws-orders-all-actions';

import { TOrdersState } from '../../types/redux';

const initialState: TOrdersState = {
	ordersAll: {
		wsConnected: false,
		orders: [],
		error: undefined,
		total: 0,
		totalToday: 0,
	},
	ordersUser: {
		wsConnected: false,
		orders: [],
		error: undefined,
	},
};

export const ordersReducer = (
	state = initialState,
	action: TWSOrdersAllActions | TWSOrdersUserActions,
): TOrdersState => {
	switch (action.type) {
		case WS_ORDERS_ALL_CONNECTION_SUCCESS:
			return {
				...state,
				ordersAll: {
					...state.ordersAll,
					error: undefined,
					wsConnected: true,
				},
			};

		case WS_ORDERS_ALL_CONNECTION_ERROR:
			return {
				...state,
				ordersAll: {
					...state.ordersAll,
					error: action.payload,
					wsConnected: false
				},
			};

		case WS_ORDERS_ALL_CONNECTION_CLOSED:
			return {
				...state,
				ordersAll: {
					...state.ordersAll,
					error: undefined,
					wsConnected: false
				}
			};

		case WS_ORDERS_ALL_GET_MESSAGE: {
			const { orders, total, totalToday } = action.payload;

			return {
				...state,
				ordersAll: {
					...state.ordersAll,
					total,
					totalToday,
					orders,
					error: undefined,
				},
			};
		};

		case WS_ORDERS_USER_CONNECTION_SUCCESS:
			return {
				...state,
				ordersUser: {
					...state.ordersUser,
					error: undefined,
					wsConnected: true,
				},
			};

		case WS_ORDERS_USER_CONNECTION_ERROR:
			return {
				...state,
				ordersUser: {
					...state.ordersUser,
					error: action.payload,
					wsConnected: false
				},
			};

		case WS_ORDERS_USER_CONNECTION_CLOSED:
			return {
				...state,
				ordersUser: {
					...state.ordersUser,
					error: undefined,
					wsConnected: false
				}
			};

		case WS_ORDERS_USER_GET_MESSAGE: {
			const { orders } = action.payload;

			return {
				...state,
				ordersUser: {
					...state.ordersUser,
					orders,
					error: undefined,
				},
			};
		};

		default:
			return state;
	}
};
