import styles from './profile.module.css';

import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from  '../../services/hooks';
import cn from 'classnames';

import ProfileEdit from '../profile-edit/profile-edit';
import ProfileOrders from '../profile-orders/profile-orders';

import { logout } from '../../services/actions/user';

const LINK_DEFAULT_CLASSES = 'text text_type_main-medium pt-3 pb-3';

const getClassesLink = (isActive: boolean) =>
	cn(
		LINK_DEFAULT_CLASSES,
		{ 'text_color_inactive': !isActive },
		styles.link
	);

const Profile: FC = () => {
	const { path } = useRouteMatch();

	const { isRequested } = useSelector(store => store.user.logout);

	const dispatch = useDispatch();

	const handleClickLogout = () => {
		dispatch(logout());
	};

	return (
		<>
			<div className={ cn(styles.container) }>
				<div className={ cn('mr-15 pt-30', styles.menu) }>
					<nav>
						<ul className={ styles.list }>
							<li>
								<NavLink to={ path }
									exact={ true }
									className={ getClassesLink }
								>Профиль</NavLink>
							</li>
							<li>
								<NavLink to={ `${ path }/orders` }
									className={ getClassesLink }
								>История заказов</NavLink>
							</li>
							<li>
								<button onClick={ handleClickLogout }
									className={ cn(
										styles.link,
										LINK_DEFAULT_CLASSES,
										'text_color_inactive'
									) }
									{...(isRequested ? {
										disabled: true,
									} : {})}
								>Выход</button>
							</li>
						</ul>
					</nav>
					<p className={ cn(styles.info, 'pt-20 text text_type_main-default text_color_inactive') }>
						В этом разделе вы можете изменить свои персональные данные
					</p>
				</div>

				<Switch>
					<Route path={ path } exact={true}>
						<div className={ cn(styles.form, 'pt-30') }>
							<ProfileEdit />
						</div>
					</Route>
					<Route path={ `${path}/orders` } exact={true}>
						<div className={ cn(styles.orders) }>
							<ProfileOrders />
						</div>
					</Route>
				</Switch>
			</div>
		</>
	);
};

export default Profile;
