import { FC } from 'react';

import cn from 'classnames';
import styles from './ingredient-icon.module.css';

const IngredientIcon: FC<{ src?: string, text?: string }> = ({ src, text }) => {
	return (
		<div className={ cn(styles.ingredient ) }>
			<img className={ cn(styles.image ) } src={ src } alt=""/>
			{ text &&
				<div className={ cn(styles.text ) }>
					<span className="text text_type_main-default">{ text }</span>
				</div>
			}
		</div>
	);
};

export default IngredientIcon;
