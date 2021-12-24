import PropTypes from 'prop-types';
import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from '../../services/reducers/index.js';

const composeEnhancers =
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);

const StoreProvider = ({ children }) => (
	<Provider store={ store }>{ children }</ Provider>
);

export default StoreProvider;

StoreProvider.propTypes = {
	children: PropTypes.node,
};
