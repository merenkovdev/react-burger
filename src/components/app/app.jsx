import styles from './app.module.css';

import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

import DataContext from '../../services/data-context';
import OrderContext from '../../services/order-context';

import {
	burgerReducer,
	orderReducer,
} from '../../services/reducers';

import {
	MODAL_DETAILS,
	MODAL_ORDER,
 } from '../../utils/constants';
import cn from 'classnames';

import { useSelector, useDispatch } from 'react-redux';
import { CLEAR_INGREDIENTS_DETAILS } from '../../services/actions/ingredients';

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
	const [ burgerState, burgerDispatch ] = React.useReducer(burgerReducer, burgerInitialState);
	const [ orderState, orderDispatch ] = React.useReducer(orderReducer, orderInitialState);

	// redux
	const activeModal = useSelector(store => store.modal.active);
	const ingredientDetails = useSelector(store => store.ingredients.ingredientDetails);
	const dispatch = useDispatch();

	const clearDetailIngredients = () => {
		dispatch({ type: CLEAR_INGREDIENTS_DETAILS });
	};

	return (
		<div className={ styles.layout }>
			<AppHeader />
			<OrderContext.Provider value={{
				orderDispatch,
				order: orderState,
			}}>
				<main className={ cn(styles.main, 'container pl-5 pr-5') }>
					<h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
					<div className="row">
						<DataContext.Provider value={{
							burgerDispatch,
							burger: burgerState,
						}}>
							<BurgerIngredients />
							<BurgerConstructor />
						</DataContext.Provider>
					</div>
				</main>

				{ activeModal === MODAL_ORDER &&
					<Modal open={ true }>
						<OrderDetails />
					</Modal>
				}

				{ activeModal === MODAL_DETAILS &&
					ingredientDetails &&
					<Modal open={ true }
						header='Детали ингредиента'
						onClose={clearDetailIngredients}
					>
						<IngredientDetails />
					</Modal>
				}
			</OrderContext.Provider>
		</div>
	)
};

export default App;
