import { FC } from 'react';

import cn from 'classnames';
import styles from './order.module.css';

import Price from '../../components/price/price';
import IngredientList from '../../components/ingredient-list/ingredient-list'

import { useSelectorOrderIngredients } from '../../services/hooks';
import { OrderStatusText, TOrder } from '../../types/api';
import { formatDate } from '../../utils/utils';

const Order: FC<{ orderData: TOrder }> = ({ orderData }) => {
	const { price, ingredients } = useSelectorOrderIngredients(orderData);

	return (
		<>
			<p className={ cn(styles.number, "text text_type_digits-default pb-10") }>#{ orderData.number }</p>
			<div className="mb-8">
				<p className="text text_type_main-medium">{ orderData.name }</p>
				<p className="text text_type_main-default text_color_success">{ OrderStatusText[orderData.status] }</p>
			</div>
			<p className="text text_type_main-medium pb-6">Состав:</p>
			<IngredientList ingredients={ingredients} />
			<div className={ styles.total }>
				<span className="text text_type_main-default text_color_inactive">{ formatDate(orderData.createdAt) }</span>
				<Price text={ price } />
			</div>
		</>
	);
};

export default Order;