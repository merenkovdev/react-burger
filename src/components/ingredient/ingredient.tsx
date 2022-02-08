import styles from './ingredient.module.css';

import React from 'react';
import cn from 'classnames';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';

import { TIngredient } from '../../types/ingredient';

const Ingredient = React.forwardRef<HTMLDivElement, TIngredient>((props, ref) => {
	const {
		item: {
			_id,
			image,
			image_large,
			name,
			price,
		},
		count,
		onClickCard,
		size = 'default',
	} = props;

	const handlerClickCard = () => {
		if (onClickCard) {
			onClickCard(_id);
		}
	};

	return (
		<div className={ cn(styles.item, { [ styles.item_clickable ]: onClickCard } ) }
			onClick={ handlerClickCard }
			{...(
				ref ? {
					ref,
				} : {}
			)}
		>
			<div className={ cn(styles.imageContainer, 'text text_type_main-default') }>
				<img className={ styles.image } src={ size === 'large' ? image_large : image } alt="" />
				{ count  &&
					<Counter count={ count } size="default" />
				}
			</div>
			{ price &&
				<div className={ cn(styles.price, 'text text_type_digits-default pt-1 pb-1') }>
					<span className="pr-2">
						{ price }
					</span>
					<CurrencyIcon type="primary" />
				</div>
			}
			<div className={ cn(styles.title, `text text_type_main-${ size === 'large' ? 'medium' : 'default' }`) }>
				{ name }
			</div>
		</div>
	);
});

export const DraggableIngredient = (props: TIngredient) => {
	const [, dragRef ] = useDrag({
		type: 'ingredient',
		item: props.item,
		collect: monitor => ({
			isDrag: monitor.isDragging()
		})
	});

	return (
		<Ingredient { ...props } ref={ dragRef } />
	);
};

export default Ingredient;