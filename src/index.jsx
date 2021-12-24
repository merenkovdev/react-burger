import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import '@ya.praktikum/react-developer-burger-ui-components';

import StoreProvider from './components/store-provider/store-provider';

import './index.css';

ReactDOM.render(
	<React.StrictMode>
		<StoreProvider>
			<App />
		</ StoreProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
