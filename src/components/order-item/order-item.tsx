import { FC } from 'react';

import cn from 'classnames';
import styles from './order-item.module.css';

import IngredientIcon from '../ingredient-icon/ingredient-icon';
import Price from '../price/price';

import { TItem, TOrder } from '../../types/api';
import { useSelectorOrderIngredients } from '../../services/hooks';
import { formatDate } from '../../utils/utils';

const MAX_NUMBER_INGREDIENTS = 6;

const IngredientsLine: FC<{ ingredients: TItem[] }> = ({ ingredients }) => {
	const visibleIngredients = ingredients.length > MAX_NUMBER_INGREDIENTS ?
		ingredients.slice(0, MAX_NUMBER_INGREDIENTS) :
		ingredients;

	const amountRemainingIngredients = visibleIngredients !== ingredients ?
		ingredients.length - MAX_NUMBER_INGREDIENTS :
		0
	;

	return (
		<>
			{ visibleIngredients.map((ingredient, index) => {
				return (
					<div key={ ingredient._id + index  } className={ cn(styles.ingredient) }>
						<IngredientIcon src={ ingredient.image }
							{...(index === 0 && amountRemainingIngredients ? {
								text: `+${ amountRemainingIngredients }`,
							} : {})}
						/>
					</div>
				)
			}) }
		</>
	);
};

const OrderItem: FC<{ order: TOrder }> = ({ order }) => {
	const {
		ingredients,
		price,
	} = useSelectorOrderIngredients(order);

	return (
		<div className={ cn(styles.item, 'p-6') }>
			<div className={ cn(styles.head, 'pb-6') }>
				<span className="text text_type_digits-default">#{ order.number }</span>
				<span className="text text_type_main-default text_color_inactive">{ formatDate(order.createdAt) }</span>
			</div>
			<p className="text text_type_main-medium mb-6">{ order.name }</p>
			<div className={ cn(styles.footer) }>
				<div className={ cn(styles.ingredients, 'pr-6') }>
					<IngredientsLine ingredients={ ingredients } />
				</div>
				<Price text={ price } />
			</div>
		</div>
	);
};

export default OrderItem;