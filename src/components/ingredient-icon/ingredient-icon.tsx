import cn from 'classnames';
import styles from './ingredient-icon.module.css';

const IngredientIcon = ({ text }: { text?: string }) => {
	return (
		<div className={ cn(styles.ingredient ) }>
			<img className={ cn(styles.image ) } src="https://code.s3.yandex.net/react/code/sauce-04.png" alt=""/>
			{ text &&
				<div className={ cn(styles.text ) }>
					<span className="text text_type_main-default">{ text }</span>
				</div>
			}
		</div>
	);
};

export default IngredientIcon;
