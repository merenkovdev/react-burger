import Price from '../../components/price/price';
import IngredientList from '../../components/ingredient-list/ingredient-list';
import Order from '../../components/order/order';

import cn from 'classnames';
import styles from './order-page.module.css';

const OrderPage = () => {
	return (
		<div className="container-small pt-30 pb-10">
			<Order />
		</div>
	);
};

export default OrderPage;