import styles from './order-details.module.css';
import cn from 'classnames';
import doneImg from '../../images/done.png';

const OrderDetails = () => {
	return (
		<div className={ styles.order }>
			<p className="text text_type_digits-large">034536</p>
			<p className={ cn('text text_type_main-large', 'pt-8') }>идентификатор заказа</p>
			<div className="pt-15 pb-15">
				<img src={ doneImg } alt="" />
			</div>
			<p className="text text_type_main-default pb-2">Ваш заказ начали готовить</p>
			<p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
		</div>
	)
};

export default OrderDetails;