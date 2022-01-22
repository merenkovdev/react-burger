import styles from './app.module.css';

import { useEffect } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import AppHeader from '../app-header/app-header';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import Loader from '../loader/loader';
import ModalDetails from '../modal-details/modal-details';

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

import { getUser } from '../../services/actions/user';

const App = () => {
	const activeModal = useSelector(store => store.modal.active);
	const ingredientDetails = useSelector(store => store.ingredients.ingredientDetails);
	const { authAttemptSucceeded } = useSelector(store => store.user);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	if (!authAttemptSucceeded) {
		return null;
	}

	return (
		<Router>
			<div className={ styles.layout }>
				<AppHeader />
				<main className={ cn(styles.main, 'container pl-5 pr-5') }>
					<Switch>
						<Route path="/" exact={true}>
							<Home />
						</Route>
						<Route path="/profile">
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
					<ModalDetails />
				}
			</div>
		</Router>
	)
};

export default App;
