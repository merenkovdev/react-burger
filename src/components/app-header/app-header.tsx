import styles from './app-header.module.css';

import {
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';

import Nav from './nav';

const AppHeader = () => {
	return (
		<header className={styles.headerContainer}>
			<div className={cn(styles.header, 'container')}>
				<Nav />
				<div className={styles.headerLogo}>
					<Logo />
				</div>

				<div className={styles.headerUser}>
					<button type="button" className={cn('text text_type_main-default text_color_inactive pt-4 pb-4 pl-5 pr-5', styles.user)}>
						<ProfileIcon type="secondary" />
						<span className="pl-2">Личный кабинет</span>
					</button>
				</div>
			</div>
		</header>
	);
};

export default AppHeader;