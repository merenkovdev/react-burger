import cn from 'classnames';

import styles from './profile.module.css';
import { NavLink } from 'react-router-dom';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import ProfileEdit from '../profile-edit/profile-edit';
import ProfileOrders from '../profile-orders/profile-orders';

const getClassesLink = isActive =>
	cn(
		'text text_type_main-medium pt-3 pb-3',
		{ 'text_color_inactive': !isActive },
		styles.link
	);

const Profile = () => {
	const { path } = useRouteMatch();

	return (
		<>
			<div className={ cn('pt-30', styles.container) }>
				<div className={ cn('mr-15', styles.menu) }>
					<nav>
						<ul className={ styles.list }>
							<li>
								<NavLink to={ path } exact={ true } className={ getClassesLink }>Профиль</NavLink>
							</li>
							<li>
								<NavLink to={ `${ path }/orders` } exact={ true } className={ getClassesLink }>История заказов</NavLink>
							</li>
							<li>
								<NavLink to="/" exact={ true } className={ getClassesLink }>Выход</NavLink>
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
