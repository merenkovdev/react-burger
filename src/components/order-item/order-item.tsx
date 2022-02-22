import IngredientIcon from '../ingredient-icon/ingredient-icon';
import Price from '../price/price';

import cn from 'classnames';
import styles from './order-item.module.css';

const OrderItem = () => {
	return (
		<div className={ cn(styles.item, 'p-6') }>
			<div className={ cn(styles.head, 'pb-6') }>
				<span className="text text_type_digits-default">#4535</span>
				<span className="text text_type_main-default text_color_inactive">Сегодня, чикибряк</span>
			</div>
			<p className="text text_type_main-medium mb-6">Death Star Starship Main бургер</p>
			<div className={ cn(styles.footer) }>
				<div className={ cn(styles.ingredients, 'pr-6') }>
					<div className={ cn(styles.ingredient) }>
						<IngredientIcon text='+3' />
					</div>
					<div className={ cn(styles.ingredient) }>
						<IngredientIcon />
					</div>
					<div className={ cn(styles.ingredient) }>
						<IngredientIcon />
					</div>
				</div>
				<Price text={ '132131' } />
			</div>
		</div>
	);
};

export default OrderItem;