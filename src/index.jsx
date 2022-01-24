import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import '@ya.praktikum/react-developer-burger-ui-components';

import { BrowserRouter } from 'react-router-dom';

import StoreProvider from './components/store-provider/store-provider';

import './index.css';

ReactDOM.render(
	<React.StrictMode>
		<StoreProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ StoreProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
