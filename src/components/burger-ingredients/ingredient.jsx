import styles from './ingredient.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';

const Ingredient = (props) => (
	<div className={styles.item}>
	{ console.log(props) }
		<div className={cn(styles.item, 'text text_type_main-default')}>
			<img src={props.image} alt="" />
		</div>
		<div className={cn(styles.price, 'text text_type_digits-default pt-1 pb-1')}>
 			<span className="pr-2">{props.price}</span><CurrencyIcon type="primary" />
		</div>
		<div className={cn(styles.title, 'text text_type_main-default')}>
			{props.name}
		</div>
	</div>
);

export default Ingredient;