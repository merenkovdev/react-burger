import type { Middleware, MiddlewareAPI } from 'redux';
import type { TApplicationActions, AppDispatch, RootState } from '../../types/redux';
import { getAccessToken } from '../../utils/tokens';

import { TResponseOrders } from './../../types/api';
import { wsOrdersAllActions } from '../../services/actions/ws-orders-all-actions';
import { wsOrdersUserActions } from '../../services/actions/ws-orders-user-actions';

export const socketMiddleware = (
	wsUrl: string,
	wsActions: typeof wsOrdersAllActions | typeof wsOrdersUserActions
): Middleware => {
	return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;

		return next => (action: TApplicationActions) => {
			const {
				wsInit,
				wsClose,
				onOpen,
				onClose,
				onError,
				onMessage,
				wsSendMessage,
			} = wsActions;
			const { dispatch, getState } = store;
			const { type } = action;
			const isAuth = getState().user.isAuth;

			if (type === wsInit) {
				socket = new WebSocket(
					`${wsUrl}${ isAuth ? `?token=${getAccessToken().token}` : ''}`
				);
			}

			if (socket) {
				socket.onopen = () => {
					dispatch(onOpen());
				};

				socket.onerror = (event: Event) => {
					dispatch(onError(event));
				};

				socket.onmessage = (event: MessageEvent) => {
					const { data } = event;
					const parsedData = JSON.parse(data);
					const { success, ...restParsedData }: TResponseOrders = parsedData;

					if (success) {
						dispatch(onMessage(restParsedData));
					} else {
						dispatch(onError(event));
					}
				};

				socket.onclose = () => {
					dispatch(onClose());
				};

				if (type === wsSendMessage) {
					socket.send(JSON.stringify(action.message));
				}

				if (type === wsClose) {
					socket.close();
				}
			}

			next(action);
		};
	});
};
