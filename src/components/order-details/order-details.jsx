import styles from './order-details.module.css';

import React from 'react';
import cn from 'classnames';

import doneImg from '../../images/done.png';
import OrderContext from '../../services/order-context';

const OrderDetails = () => {
	const { order } = React.useContext(OrderContext);

	return (
		<div className={ styles.order }>
			{ order.error &&
				<p className={ cn('text text_type_main-large', 'pt-8') }>Ошибка при создании заказа</p>
			}

			{ !order.error &&
				<>
					<p className="text text_type_digits-large">{ order.number }</p>
					<p className={ cn('text text_type_main-large', 'pt-8') }>идентификатор заказа</p>
					<div className="pt-15 pb-15">
						<img src={ doneImg } alt="" />
					</div>
					<p className="text text_type_main-default pb-2">Ваш заказ начали готовить</p>
					<p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
				</>
			}
		</div>
	)
};

export default OrderDetails;
