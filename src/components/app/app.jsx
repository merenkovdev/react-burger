import styles from './app.module.css';

import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

import DataContext from '../../services/data-context';
import ModalContext from '../../services/modal-context';
import OrderContext from '../../services/order-context';

import {
	modalReducer,
	dataReducer,
	burgerReducer,
	orderReducer,
} from '../../services/reducers';

import {
	API_INGREDIENTS,
	MODAL_DETAILS,
	MODAL_ORDER,
 } from '../../utils/constants';
import { checkResponse } from '../../utils/utils';
import cn from 'classnames';

const modalInitialState = {
	modal: '',
	closeModal: () => {}
};

const dataInitialState = {
	isLoading: false,
	hasError: false,
	ingredients: [],
	itemDetails: null,
};

const burgerInitialState = {
	bun: {},
	toppings: [],
	totalPrice: 0,
};

const orderInitialState = {
	number: 0,
	name: '',
};

const App = () => {
	const [ modalState, modalDispatch ] = React.useReducer(modalReducer, modalInitialState);
	const [ dataState, dataDispatch ] = React.useReducer(dataReducer, dataInitialState);
	const [ burgerState, burgerDispatch ] = React.useReducer(burgerReducer, burgerInitialState);
	const [ orderState, orderDispatch ] = React.useReducer(orderReducer, orderInitialState);

	const handleError = (error) => {
		console.warn(error);
		dataDispatch({ type: 'fail-fetch' });
	};

	const closeModal= React.useCallback(() => {
		modalDispatch({ type: 'hide' });
	}, [ modalDispatch ]);

	const openModal = React.useCallback(
		(name) => () => {
			modalDispatch({ type: name });
		},
		[ modalDispatch ]
	);

	const openModalDetails = openModal(MODAL_DETAILS);
	const openModalOrder = openModal(MODAL_ORDER);

	const getIngredients = () => {
		dataDispatch({ type: 'start-fetch' });

		try {
			fetch(API_INGREDIENTS)
				.then(checkResponse)
				.then(response => {
					if (!response.success) {
						throw new Error('Данные не получены');
					}

					dataDispatch({ type: 'done-fetch', payload: response.data });
				})
				.catch(handleError);
		} catch (error) {
			handleError(error);
		}
	};

	React.useEffect(getIngredients, []);

	const {
		ingredients,
		isLoading,
		hasError,
		itemDetails,
	} = dataState;

	return (
		<div className={ styles.layout }>
			<AppHeader />
			<ModalContext.Provider value={{
				openModalDetails,
				openModalOrder,
				closeModal,
			}}>
				<OrderContext.Provider value={{
					orderDispatch,
					order: orderState,
				}}>
					{ isLoading &&
						<p className="text text_type_main-large p-10">
							Загрузка...
						</p>
					}
					{ hasError &&
						<p className="text text_type_main-large p-10">
							Произошла ошибка
						</p>
					}
					{ !isLoading &&
						!hasError &&
						Boolean(ingredients.length) &&
						<main className={ cn(styles.main, 'container pl-5 pr-5') }>
							<h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
							<div className="row">
								<DataContext.Provider value={{
									dataDispatch,
									burgerDispatch,
									ingredients,
									burger: burgerState,
								}}>
									<BurgerIngredients />
									<BurgerConstructor />
								</DataContext.Provider>
							</div>
						</main>
					}

					{ modalState.modal === MODAL_ORDER &&
						<Modal open={ true }>
							<OrderDetails />
						</Modal>
					}

					{ modalState.modal === MODAL_DETAILS &&
						itemDetails &&
						<Modal open={ true }
							header='Детали ингредиента'
						>
							<IngredientDetails item={ itemDetails } />
						</Modal>
					}
				</OrderContext.Provider>
			</ModalContext.Provider>
		</div>
	)
};

export default App;
