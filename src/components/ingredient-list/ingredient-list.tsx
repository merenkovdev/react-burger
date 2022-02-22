import IngredientIcon from '../ingredient-icon/ingredient-icon';
import Price from '../price/price';

import cn from 'classnames';
import styles from './ingredient-list.module.css';

const Ingredient = () => {
	return (
		<div className={ cn(styles.item) }>
			<div className={ cn(styles.image, 'pr-4') }>
				<IngredientIcon />
			</div>
			<div className={ cn(styles.name, 'text text_type_main-default pr-4') }>Флюоресцентная булка R2-D3</div>
			<Price text={ '1 X 132131' } />
		</div>
	);
};

const IngredientList = () => {
	return (
		<div className={ cn(styles.container, 'custom-scroll pr-6 mb-10') }>
			<ul className="list-without-style">
				<li className="pb-4">
					<Ingredient />
				</li>
				<li className="pb-4">
					<Ingredient />
				</li>
				<li className="pb-4">
					<Ingredient />
				</li>
			</ul>
		</div>
	);
};

export default IngredientList;
