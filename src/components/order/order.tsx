import Price from '../../components/price/price';
import IngredientList from '../../components/ingredient-list/ingredient-list'

import cn from 'classnames';
import styles from './order.module.css';

const Order = () => {
	return (
		<>
			<p className={ cn(styles.number, "text text_type_digits-default pb-10") }>#034533</p>
			<div className="mb-8">
				<p className="text text_type_main-medium">Black Hole Singularity острый бургер</p>
				<p className="text text_type_main-default text_color_success">Выполнен</p>
			</div>
			<p className="text text_type_main-medium pb-6">Состав:</p>
			<IngredientList />
			<div className={ styles.total }>
				<span className="text text_type_main-default text_color_inactive">Сегодня, чикибряк</span>
				<Price text={ '510' } />
			</div>
		</>
	);
};

export default Order;