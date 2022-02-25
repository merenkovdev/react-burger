import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { rootReducer } from './reducers';
import { socketMiddleware } from '../services/middleware';

import { API_WS_ORDERS_USER, API_WS_ORDERS_ALL } from '../utils/constants';
import { wsOrdersAllActions } from '../services/actions/ws-orders-all-actions';
import { wsOrdersUserActions } from '../services/actions/ws-orders-user-actions';

const store = createStore(
	rootReducer,
	composeWithDevTools(
		applyMiddleware(thunk),
		applyMiddleware(socketMiddleware(API_WS_ORDERS_ALL, wsOrdersAllActions)),
		applyMiddleware(socketMiddleware(API_WS_ORDERS_USER, wsOrdersUserActions))
	)
);

export default store;
