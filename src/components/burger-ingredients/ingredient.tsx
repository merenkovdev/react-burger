import styles from './ingredient.module.css';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';

const Ingredient = (
	props: {
		image: string,
		price: number,
		name: string
	}
) => (
	<div className={ styles.item }>
		<div className={ cn(styles.imageContainer, 'text text_type_main-default') }>
			<img className={ styles.image } src={ props.image } alt="" />
			<Counter count={1} size="default" />
		</div>
		<div className={ cn(styles.price, 'text text_type_digits-default pt-1 pb-1') }>
 			<span className="pr-2">
				{ props.price }
			</span>
			<CurrencyIcon type="primary" />
		</div>
		<div className={ cn(styles.title, 'text text_type_main-default') }>
			{ props.name }
		</div>
	</div>
);

export default Ingredient;