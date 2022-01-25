import cn from 'classnames';

import styles from './not-found-404.module.css';

const NotFound404 = () => {

	return (
		<div className={ 'pt-30' }>
			<div className={ cn(styles.header, 'mb-6') }>
				<span className={ cn(styles.notfound, 'text text_type_main-large') } title="404">404</span>
				<p className="text text_type_main-large">Нет такой страницы</p>
			</div>
		</div>
	);
};

export default NotFound404;
