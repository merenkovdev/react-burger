import { FC } from 'react';

import cn from 'classnames';
import styles from './ingredient-list.module.css';

import IngredientIcon from '../ingredient-icon/ingredient-icon';
import Price from '../price/price';

import { groupIngredients } from '../../services/helpers';
import { TItem, IngredientType } from '../../types/api';
import { NUMBER_BUNS_IN_BURGERS } from '../../utils/constants';

const Ingredient: FC<{ ingredient: TItem, count: number }> = ({ ingredient, count }) => {
	return (
		<div className={ cn(styles.item) }>
			<div className={ cn(styles.image, 'pr-4') }>
				<IngredientIcon src={ ingredient.image } />
			</div>
			<div className={ cn(styles.name, 'text text_type_main-default pr-4') }>{ ingredient.name }</div>
			<Price text={ `${ count } X ${ ingredient.price }` } />
		</div>
	);
};

const IngredientList: FC<{ ingredients: TItem[] }> = ({ ingredients }) => {
	const gruppedIngredients = groupIngredients(ingredients);

	return (
		<div className={ cn(styles.container, 'custom-scroll pr-6 mb-10') }>
			<ul className="list-without-style">
				{ Object.keys(gruppedIngredients)
					.map(id => {
						const ingredient = gruppedIngredients[id].ingredient;
						const count = ingredient.type === IngredientType.bun ?
							NUMBER_BUNS_IN_BURGERS :
							gruppedIngredients[id].count;

						return (
							<li key={ ingredient._id } className="pb-4">
								<Ingredient ingredient={ ingredient } count={ count } />
							</li>
						);
					})
				}
			</ul>
		</div>
	);
};

export default IngredientList;
