import styles from './ingredient.module.css';

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { itemPropTypes } from '../../utils/types';
import { useDrag } from 'react-dnd';

const Ingredient = React.forwardRef((props, ref) => {
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
				{ Boolean(count) &&
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

export const DraggableIngredient = (props) => {
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

Ingredient.propTypes = {
	item: PropTypes.shape(itemPropTypes).isRequired,
	count: PropTypes.number,
	onClickCard: PropTypes.func,
	size: PropTypes.string,
};
