import styles from './profile.module.css';

import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from  '../../services/hooks';
import cn from 'classnames';

import { logout } from '../../services/actions/user';
import ProfileEdit from '../profile-edit/profile-edit';
import ProfileOrders from '../profile-orders/profile-orders';

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
			<div className={ cn('pt-30', styles.container) }>
				<div className={ cn('mr-15', styles.menu) }>
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
				<div className={ styles.content }>
					<Switch>
						<Route path={ path } exact={true}>
							<ProfileEdit />
						</Route>
						<Route path={ `${path}/orders` } exact={true}>
							<ProfileOrders />
						</Route>
					</Switch>
				</div>
			</div>
		</>
	);
};

export default Profile;
