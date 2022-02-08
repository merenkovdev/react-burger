import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { rootReducer } from '../../services/reducers/index.js';
import { FC } from 'react';

const store = createStore(
	rootReducer,
	composeWithDevTools(
		applyMiddleware(thunk)
	)
);

const StoreProvider: FC = ({ children }) => (
	<Provider store={ store }>{ children }</ Provider>
);

export default StoreProvider;
