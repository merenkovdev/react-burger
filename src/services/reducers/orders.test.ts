import { ordersReducer, ordersInitialState } from './orders';
import * as OrdersAllActions from '../actions/ws-orders-all-actions';
import * as OrdersUserActions from '../actions/ws-orders-user-actions';
import {
	mockOrder1,
	mockOrder2,
 } from './mock';

const orders = [mockOrder1, mockOrder2];

describe('orders reducer', () => {
	it('should return the initial state', () => {
		expect(ordersReducer(
			undefined,
			{} as OrdersAllActions.TWSOrdersAllActions & OrdersUserActions.TWSOrdersUserActions
		)).toEqual(ordersInitialState);
	});

	it('should handle websocket "orders all" conection success', () => {
		expect(ordersReducer(
			ordersInitialState,
			OrdersAllActions.wsConnectionSuccess()
		)).toEqual({
			...ordersInitialState,
			ordersAll: {
				...ordersInitialState.ordersAll,
				error: undefined,
				wsConnected: true,
			},
		});
	});

	it('should handle websocket "orders all" conection failed', () => {
		const error = {} as Event;
		expect(ordersReducer(
			ordersInitialState,
			OrdersAllActions.wsConnectionError(error)
		)).toEqual({
			...ordersInitialState,
			ordersAll: {
				...ordersInitialState.ordersAll,
				error,
				wsConnected: false
			},
		});
	});

	it('should handle websocket "orders all" conection closed', () => {
		expect(ordersReducer(
			ordersInitialState,
			OrdersAllActions.wsConnectionClosed()
		)).toEqual({
			...ordersInitialState,
			ordersAll: {
				...ordersInitialState.ordersAll,
				error: undefined,
				wsConnected: false
			},
		});
	});

	it('should handle websocket "orders all" get message', () => {
		const message = { orders, total: 100, totalToday: 10 };
		expect(ordersReducer(
			ordersInitialState,
			OrdersAllActions.wsGetMessage(message)
		)).toEqual({
			...ordersInitialState,
			ordersAll: {
				...ordersInitialState.ordersAll,
				...message,
				error: undefined
			},
		});
	});

	// user ws
	it('should handle websocket "orders user" conection success', () => {
		expect(ordersReducer(
			ordersInitialState,
			OrdersUserActions.wsConnectionSuccess()
		)).toEqual({
			...ordersInitialState,
			ordersUser: {
				...ordersInitialState.ordersUser,
				error: undefined,
				wsConnected: true,
			},
		});
	});

	it('should handle websocket "orders user" conection failed', () => {
		const error = {} as Event;
		expect(ordersReducer(
			ordersInitialState,
			OrdersUserActions.wsConnectionError(error)
		)).toEqual({
			...ordersInitialState,
			ordersUser: {
				...ordersInitialState.ordersUser,
				error,
				wsConnected: false
			},
		});
	});

	it('should handle websocket "orders user" conection closed', () => {
		expect(ordersReducer(
			ordersInitialState,
			OrdersUserActions.wsConnectionClosed()
		)).toEqual({
			...ordersInitialState,
			ordersUser: {
				...ordersInitialState.ordersUser,
				error: undefined,
				wsConnected: false
			},
		});
	});

	it('should handle websocket "orders user" get message', () => {
		const message = { orders, total: 100, totalToday: 10 };
		expect(ordersReducer(
			ordersInitialState,
			OrdersUserActions.wsGetMessage(message)
		)).toEqual({
			...ordersInitialState,
			ordersUser: {
				...ordersInitialState.ordersUser,
				orders: message.orders,
				error: undefined
			},
		});
	});
});
