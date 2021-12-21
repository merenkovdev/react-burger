import styles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

import {
	MODAL_DETAILS,
	MODAL_ORDER,
 } from '../../utils/constants';
import cn from 'classnames';

import { useSelector, useDispatch } from 'react-redux';
import { CLEAR_INGREDIENTS_DETAILS } from '../../services/actions/ingredients';

const App = () => {
	const activeModal = useSelector(store => store.modal.active);
	const ingredientDetails = useSelector(store => store.ingredients.ingredientDetails);
	const dispatch = useDispatch();

	const clearDetailIngredients = () => {
		dispatch({ type: CLEAR_INGREDIENTS_DETAILS });
	};

	return (
		<div className={ styles.layout }>
			<AppHeader />
			<main className={ cn(styles.main, 'container pl-5 pr-5') }>
				<h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
				<div className="row">
					<BurgerIngredients />
					<BurgerConstructor />
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
		</div>
	)
};

export default App;
