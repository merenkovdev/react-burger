import { TResponseOrders } from './../../types/api';
import {
	WS_ORDERS_ALL_CONNECTION_INIT,
	WS_ORDERS_ALL_CONNECTION_SUCCESS,
	WS_ORDERS_ALL_CONNECTION_ERROR,
	WS_ORDERS_ALL_CONNECTION_CLOSED,
	WS_ORDERS_ALL_GET_MESSAGE,
	WS_ORDERS_ALL_SEND_MESSAGE,
	WS_ORDERS_ALL_CLOSE_CONNECTION,
} from '../constants/socket';

export type TWSOrdersAllConnectionInit = {
	readonly type: typeof WS_ORDERS_ALL_CONNECTION_INIT;
};

export type TWSOrdersAllConnectionSuccess = {
	readonly type: typeof WS_ORDERS_ALL_CONNECTION_SUCCESS;
};

export type TWSOrdersAllConnectionError = {
	readonly type: typeof WS_ORDERS_ALL_CONNECTION_ERROR;
	readonly payload: Event;
};

export type TWSOrdersAllConnectionClosed = {
	readonly type: typeof WS_ORDERS_ALL_CONNECTION_CLOSED;
};

export type TWSOrdersAllGetMessage = {
	readonly type: typeof WS_ORDERS_ALL_GET_MESSAGE;
	readonly payload: TResponseOrders;
};

export type TWSOrdersAllSendMessage = {
	readonly type: typeof WS_ORDERS_ALL_SEND_MESSAGE;
	readonly message: any;
};

export type TWSOrdersAllCloseConnection = {
	readonly type: typeof WS_ORDERS_ALL_CLOSE_CONNECTION;
};

export type TWSOrdersAllActions =
	TWSOrdersAllConnectionInit
	| TWSOrdersAllConnectionSuccess
	| TWSOrdersAllConnectionError
	| TWSOrdersAllConnectionClosed
	| TWSOrdersAllGetMessage
	| TWSOrdersAllSendMessage
	| TWSOrdersAllCloseConnection
;

export const wsConnectionInit = (): TWSOrdersAllConnectionInit => {
	return {
		type: WS_ORDERS_ALL_CONNECTION_INIT
	};
};

export const wsConnectionSuccess = (): TWSOrdersAllConnectionSuccess => {
	return {
		type: WS_ORDERS_ALL_CONNECTION_SUCCESS
	};
};

export const wsConnectionError = (error: Event): TWSOrdersAllConnectionError => {
	return {
		type: WS_ORDERS_ALL_CONNECTION_ERROR,
		payload: error,
	};
};

export const wsConnectionClosed = (): TWSOrdersAllConnectionClosed => {
	return {
		type: WS_ORDERS_ALL_CONNECTION_CLOSED
	};
};

export const wsGetMessage = (message: TResponseOrders): TWSOrdersAllGetMessage => {
	return {
		type: WS_ORDERS_ALL_GET_MESSAGE,
		payload: message,
	};
};

export const wsSendMessage = (message: any): TWSOrdersAllSendMessage => {
	return {
		type: WS_ORDERS_ALL_SEND_MESSAGE,
		message,
	};
};

export const wsCloseConnetion = (): TWSOrdersAllCloseConnection => {
	return {
		type: WS_ORDERS_ALL_CLOSE_CONNECTION,
	};
};

export const wsOrdersAllActions = {
	wsInit: WS_ORDERS_ALL_CONNECTION_INIT,
	wsSendMessage: WS_ORDERS_ALL_SEND_MESSAGE,
	wsClose: WS_ORDERS_ALL_CLOSE_CONNECTION,
	onOpen: wsConnectionSuccess,
	onClose: wsConnectionClosed,
	onError: wsConnectionError,
	onMessage: wsGetMessage
};
