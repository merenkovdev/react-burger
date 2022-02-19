import styles from './order-details.module.css';

import { FC } from 'react';
import { useSelector } from '../../services/hooks';
import cn from 'classnames';

import doneImg from '../../images/done.png';

const OrderDetails: FC = () => {
	const order = useSelector(store => store.order);

	return (
		<div className={ styles.order }>
			{ order.hasError &&
				<p className={ cn('text text_type_main-large', 'pt-8') }>
					{ order.textError ?
						order.textError :
						'Ошибка при создании заказа'
					}
				</p>
			}

			{ !order.hasError &&
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
