import styles from './nav.module.css';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import {
	ListIcon,
	BurgerIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';

const getClassesLink = (isActive?: boolean) =>
	cn(
		'text text_type_main-default pt-4 pb-4 pl-5 pr-5',
		{ [styles.link_inactive + ' text_color_inactive']: !isActive },
		styles.link
	);

const Nav: FC = () => (
	<nav>
		<ul className={ styles.list }>
			<li>
				<NavLink className={ getClassesLink } to="/" exact={ true }>
					<BurgerIcon type="primary" />
					<span className="pl-2">Конструктор</span>
				</NavLink>
			</li>
			<li>
				<NavLink className={ getClassesLink } to="/feed">
					<ListIcon type="primary" />
					<span className="pl-2">Лента новостей</span>
				</NavLink>
			</li>
		</ul>
	</nav>
);

export default Nav;