import styles from './app.module.css';

import { FC, useEffect } from 'react';

import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/hooks';
import cn from 'classnames';

import AppHeader from '../app-header/app-header';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import ModalDetails from '../modal-details/modal-details';
import ProtectedRoute from '../protected-route/protected-route';
import Order from '../order/order';

import {
	Home,
	OrderFeed,
	OrderPage,
	LoginPage,
	RegisterPage,
	ForgotPasswordPage,
	ResetPasswordPage,
	ProfilePage,
	IngredientPage,
	NotFound404,
} from '../../pages';

import { MODAL_ORDER } from '../../utils/constants';

import { getUser } from '../../services/actions/user';
import { getIngredients } from '../../services/actions/ingredients';
import { TAppLocation } from '../../types'

const App: FC = () => {
	const location = useLocation<TAppLocation>();
	const history = useHistory();
	const background = location?.state?.background;
	const activeModal = useSelector(store => store.modal.active);
	const {
		items: ingredients,
		isRequested: isRequestedIngredients,
	} = useSelector(store => store.ingredients);
	const { authAttemptSucceeded } = useSelector(store => store.user);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getIngredients());
	}, [ dispatch ]);

	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	if (!authAttemptSucceeded || !ingredients.length || isRequestedIngredients) {
		return null;
	}

	return (
		<div className={ styles.layout }>
			<AppHeader />
			<main className={ cn(styles.main, 'container pl-5 pr-5') }>
				<Switch location={ background || location }>
					<Route path="/" exact={true}>
						<Home />
					</Route>
					<Route path="/feed" exact={true}>
						<OrderFeed />
					</Route>
					<Route path="/feed/:id" exact={true}>
						<OrderPage />
					</Route>
					<Route path="/ingredients/:id" exact={true}>
						<IngredientPage />
					</Route>
					<ProtectedRoute path="/profile/orders/:id" exact={true}>
						<OrderPage />
					</ProtectedRoute>
					<ProtectedRoute path="/profile">
						<ProfilePage />
					</ProtectedRoute>
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
					<Route>
						<NotFound404 />
					</Route>
				</Switch>
			</main>

			{ activeModal === MODAL_ORDER &&
				<Modal open={ true }>
					<OrderDetails />
				</Modal>
			}

			{ background && Boolean(ingredients.length) &&
				<>
					<Route path="/ingredients/:id" >
						<ModalDetails />
					</Route>
					<Route path="/feed/:id" >
						<Modal open={ true }
							onClose={() => history.goBack()}
						>
							<Order />
						</Modal>
					</Route>
				</>
			}

			{ background && Boolean(ingredients.length) &&
				<>
					<Route path="/profile/orders/:id">
						<Modal open={ true }
							onClose={() => history.goBack()}
						>
							<Order />
						</Modal>
					</Route>
				</>
			}
		</div>
	)
};

export default App;
