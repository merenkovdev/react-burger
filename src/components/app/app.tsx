import styles from './app.module.css';

import { FC, useEffect } from 'react';

import { Route, Switch, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/hooks';
import cn from 'classnames';

import AppHeader from '../app-header/app-header';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import ModalDetails from '../modal-details/modal-details';
import ProtectedRoute from '../protected-route/protected-route';
import ModalOrder from '../modal-order/modal-order';

import {
	Home,
	OrderFeed,
	OrderPageUser,
	OrderPageAll,
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
	const background = location?.state?.background;
	const activeModal = useSelector(store => store.modal.active);
	const {
		items: ingredients,
		isRequested: isRequestedIngredients,
	} = useSelector(store => store.ingredients);
	const { authAttemptСompleted } = useSelector(store => store.user);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getIngredients());
	}, [ dispatch ]);

	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	if (!authAttemptСompleted || !ingredients.length || isRequestedIngredients) {
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
						<OrderPageAll />
					</Route>
					<Route path="/ingredients/:id" exact={true}>
						<IngredientPage />
					</Route>
					<ProtectedRoute path="/profile/orders/:id" exact={true}>
						<OrderPageUser />
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
				<Modal open={ true } name={ MODAL_ORDER }>
					<OrderDetails />
				</Modal>
			}

			{ background && Boolean(ingredients.length) &&
				<>
					<Route path="/ingredients/:id" >
						<ModalDetails />
					</Route>
					<Route path="/feed/:id" >
						<ModalOrder />
					</Route>
					<Route path="/profile/orders/:id">
						<ModalOrder />
					</Route>
				</>
			}
		</div>
	)
};

export default App;
