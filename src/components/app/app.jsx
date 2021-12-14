import styles from './app.module.css';

import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

import {
	API_URL,
	MODAL_DETAILS,
	MODAL_ORDER,
 } from '../../utils/constants';
import cn from 'classnames';

const App = () => {
	const [ state, setState ] = React.useState({
		isLoading: false,
		hasError: false,
		data: [],
		modal: '',
		itemDetails: null,
	});

	const handleError = (error) => {
		console.warn(error);
		setState(prevState => ({
			...prevState,
			isLoaded: false,
			hasError: true
		}));
	};

	const closeModal= React.useCallback(() => {
		setState({
			...state,
			modal: '',
		});
	}, [ state ]);

	const openModal = React.useCallback(
		(name) => (dataProp) =>
			setState({
				...state,
				...dataProp,
				modal: name,
			}),
		[ state ]
	);

	const openModalDetails = openModal(MODAL_DETAILS);
	const openModalOrder = openModal(MODAL_ORDER);

	const getIngredients = () => {
		setState(prevState => ({
			...prevState,
			isLoaded: true,
			hasError: false,
		}));

		try {
			fetch(API_URL)
				.then(response => response.json())
				.then(response => {
					if (!response.success) {
						throw new Error('Данные не получены');
					}

					setState((prevState) => ({
						...prevState,
						isLoaded: false,
						data: response.data,
					}));
				})
				.catch(handleError);
		} catch (error) {
			handleError(error);
		}

		fetch(API_URL)
			.then(response => response.json())
			.then(response => {
				setState((prevState) => ({
					...prevState,
					isLoaded: false,
					data: response.data,
				}));
			})
			.catch(err => {
				console.warn(err);
				setState(prevState => ({
					...prevState,
					isLoaded: false,
					hasError: true
				}));
			});
	};

	React.useEffect(getIngredients, []);

	const {
		isLoading,
		hasError,
		modal,
		data,
		itemDetails,
	} = state;

	return (
		<div className={ styles.layout }>
			<AppHeader />
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
				<main className={ cn(styles.main, 'container pl-5 pr-5') }>
					<h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
					<div className="row">
						<BurgerIngredients data={ data }
							modal={ modal }
							openModal={ openModalDetails }
							closeModal={ closeModal }
						/>
						<BurgerConstructor data={ data } openModal={ openModalOrder } />
					</div>
				</main>
			}

			{ modal === MODAL_ORDER &&
				<Modal open={ true }
					onClose={ closeModal }
				>
					<OrderDetails />
				</Modal>
			}

			{ modal === MODAL_DETAILS &&
				itemDetails &&
				<Modal open={ true }
					onClose={ closeModal }
					header='Детали ингредиента'
				>
					<IngredientDetails {...itemDetails} />
				</Modal>
			}
		</div>
	)
};

export default App;
