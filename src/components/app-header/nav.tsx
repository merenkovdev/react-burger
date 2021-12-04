import styles from './nav.module.css';

import {
	ListIcon,
	BurgerIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';

const defaultClassesLink = 'text text_type_main-default pt-4 pb-4 pl-5 pr-5';

const Nav = () => (
	<nav>
		<ul className={ styles.list }>
			<li>
				<a className={ cn(defaultClassesLink, styles.link)} href="#">
					<BurgerIcon type="primary" />
					<span className="pl-2">Конструктор</span>
				</a>
			</li>
			<li>
				<a className={ cn(defaultClassesLink, styles.link, 'text_color_inactive')} href="#">
					<ListIcon type="secondary" />
					<span className="pl-2">Лента новостей</span>
				</a>
			</li>
		</ul>
	</nav>
);

export default Nav;