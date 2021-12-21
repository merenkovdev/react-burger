import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import '@ya.praktikum/react-developer-burger-ui-components';
import './index.css';

import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/index.js';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={ store }>
			<App />
		</ Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
