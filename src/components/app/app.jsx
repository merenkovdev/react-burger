import styles from './app.module.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import AppHeader from '../app-header/app-header';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

import {
	Home,
	LoginPage,
	RegisterPage,
	ForgotPasswordPage,
	ResetPasswordPage,
	ProfilePage,
} from '../../pages';

import {
	MODAL_DETAILS,
	MODAL_ORDER,
 } from '../../utils/constants';

import { CLEAR_INGREDIENTS_DETAILS } from '../../services/actions/ingredients';

const App = () => {
	const activeModal = useSelector(store => store.modal.active);
	const ingredientDetails = useSelector(store => store.ingredients.ingredientDetails);
	const dispatch = useDispatch();

	const clearDetailIngredients = () => {
		dispatch({ type: CLEAR_INGREDIENTS_DETAILS });
	};

	return (
		<Router>
			<div className={ styles.layout }>
				<AppHeader />
				<main className={ cn(styles.main, 'container pl-5 pr-5') }>
					<Switch>
						<Route path="/" exact={true}>
							<Home />
						</Route>
						<Route path="/profile" exact={true}>
							<ProfilePage />
						</Route>
						<Route path="/login" exact={true}>
							<LoginPage />
						</Route>
						<Route path="/register" exact={true}>
							<RegisterPage />
						</Route>
						<Route path="/forgot-password" exact={true}>
							<ForgotPasswordPage />
						</Route>
						<Route path="/reset-password" exact={true}>
							<ResetPasswordPage />
						</Route>
					</Switch>
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
		</Router>
	)
};

export default App;
