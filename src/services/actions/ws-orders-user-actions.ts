import {
	WS_ORDERS_USER_CONNECTION_INIT,
	WS_ORDERS_USER_CONNECTION_SUCCESS,
	WS_ORDERS_USER_CONNECTION_ERROR,
	WS_ORDERS_USER_CONNECTION_CLOSED,
	WS_ORDERS_USER_GET_MESSAGE,
	WS_ORDERS_USER_SEND_MESSAGE,
	WS_ORDERS_USER_CLOSE_CONNECTION,
} from '../constants/socket';
import { TResponseOrders } from '../../types/api';

export type TWSOrdersUserConnectionInit = {
	readonly type: typeof WS_ORDERS_USER_CONNECTION_INIT;
};

export type TWSOrdersUserConnectionSuccess = {
	readonly type: typeof WS_ORDERS_USER_CONNECTION_SUCCESS;
};

export type TWSOrdersUserConnectionError = {
	readonly type: typeof WS_ORDERS_USER_CONNECTION_ERROR;
	readonly payload: Event;
};

export type TWSOrdersUserConnectionClosed = {
	readonly type: typeof WS_ORDERS_USER_CONNECTION_CLOSED;
};

export type TWSOrdersUserGetMessage = {
	readonly type: typeof WS_ORDERS_USER_GET_MESSAGE;
	readonly payload: TResponseOrders;
};

export type TWSOrdersUserSendMessage = {
	readonly type: typeof WS_ORDERS_USER_SEND_MESSAGE;
	readonly message: any;
};

export type TWSOrdersUserCloseConnection = {
	readonly type: typeof WS_ORDERS_USER_CLOSE_CONNECTION;
};

export type TWSOrdersUserActions =
	TWSOrdersUserConnectionInit
	| TWSOrdersUserConnectionSuccess
	| TWSOrdersUserConnectionError
	| TWSOrdersUserConnectionClosed
	| TWSOrdersUserGetMessage
	| TWSOrdersUserSendMessage
	| TWSOrdersUserCloseConnection
;

export const wsConnectionInit = (): TWSOrdersUserConnectionInit => {
	return {
		type: WS_ORDERS_USER_CONNECTION_INIT
	};
};

export const wsConnectionSuccess = (): TWSOrdersUserConnectionSuccess => {
	return {
		type: WS_ORDERS_USER_CONNECTION_SUCCESS
	};
};

export const wsConnectionError = (error: Event): TWSOrdersUserConnectionError => {
	return {
		type: WS_ORDERS_USER_CONNECTION_ERROR,
		payload: error,
	};
};

export const wsConnectionClosed = (): TWSOrdersUserConnectionClosed => {
	return {
		type: WS_ORDERS_USER_CONNECTION_CLOSED
	};
};

export const wsGetMessage = (message: TResponseOrders): TWSOrdersUserGetMessage => {
	return {
		type: WS_ORDERS_USER_GET_MESSAGE,
		payload: message,
	};
};

export const wsSendMessage = (message: any): TWSOrdersUserSendMessage => {
	return {
		type: WS_ORDERS_USER_SEND_MESSAGE,
		message,
	};
};

export const wsCloseConnetion = (): TWSOrdersUserCloseConnection => {
	return {
		type: WS_ORDERS_USER_CLOSE_CONNECTION,
	};
};

export const wsOrdersUserActions = {
	wsInit: WS_ORDERS_USER_CONNECTION_INIT,
	wsSendMessage: WS_ORDERS_USER_SEND_MESSAGE,
	wsClose: WS_ORDERS_USER_CLOSE_CONNECTION,
	onOpen: wsConnectionSuccess,
	onClose: wsConnectionClosed,
	onError: wsConnectionError,
	onMessage: wsGetMessage
};
