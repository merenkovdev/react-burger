import styles from './app-header.module.css';

import { FC } from 'react';

import { NavLink } from 'react-router-dom';
import {
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';

import Nav from './nav';

const getClassesLink = (isActive?: boolean) =>
	cn(
		'text text_type_main-default pt-4 pb-4 pl-5 pr-5',
		{ [styles.link_inactive + ' text_color_inactive']: !isActive },
		styles.user
	);

const AppHeader: FC = () => {
	return (
		<header className={ styles.headerContainer }>
			<div className={ cn(styles.header, 'container') }>
				<Nav />
				<div className={ styles.headerLogo }>
					<Logo />
				</div>

				<div className={ styles.headerUser }>
					<NavLink to="/profile" className={getClassesLink}>
						<ProfileIcon type="primary" />
						<span className="pl-2">Личный кабинет</span>
					</NavLink>
				</div>
			</div>
		</header>
	);
};

export default AppHeader;