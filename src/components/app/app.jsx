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
import {
	modalReducer,
	dataReducer,
} from '../../services/reducers';

import {
	API_URL,
	MODAL_DETAILS,
	MODAL_ORDER,
 } from '../../utils/constants';
import cn from 'classnames';

const modalInitialState = {
	modal: '',
	closeModal: () => {}
};

const dataInitialState = {
	isLoading: false,
	hasError: false,
	data: [],
	itemDetails: null,
};

const App = () => {
	const [ modalState, modalDispatch ] = React.useReducer(modalReducer, modalInitialState);
	const [ dataState, dataDispatch ] = React.useReducer(dataReducer, dataInitialState);

	const handleError = (error) => {
		console.warn(error);
		dataDispatch({ type: 'fail-fetch' });
	};

	const closeModal= () => {
		modalDispatch({ type: 'hide' });
	};

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
			fetch(API_URL)
				.then(response => response.json())
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
		data,
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
				modal: modalState.modal,
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
					Boolean(data.length) &&
					<DataContext.Provider value={{ data, dataDispatch }}>
						<main className={ cn(styles.main, 'container pl-5 pr-5') }>
							<h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
							<div className="row">
								<BurgerIngredients />
								<BurgerConstructor />
							</div>
						</main>
					</DataContext.Provider>
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
						<IngredientDetails {...itemDetails} />
					</Modal>
				}
			</ModalContext.Provider>
		</div>
	)
};

export default App;
