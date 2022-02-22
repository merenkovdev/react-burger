import cn from 'classnames';
import styles from './price.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Price = ({
	text,
	size = 'default'
}: {
	text: string | number,
	size?: 'default' | 'medium'
}) => {
	return (
		<div className={ cn(styles.price, `text text_type_digits-${ size }`) }>
			<span className="pr-2">{ text }</span><CurrencyIcon type="primary" />
		</div>
	);
};

export default Price;
