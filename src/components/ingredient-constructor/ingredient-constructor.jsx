import styles from './ingredient-constructor.module.css';
import React from 'react';

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import cn from 'classnames';

import { MOVE_INGREDIENT } from '../../services/actions/burger';

import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { itemPropTypes } from '../../utils/types';

const ingredietnProtoTypes = {
	item: PropTypes.shape(itemPropTypes).isRequired,
	type: PropTypes.oneOf(['top', 'bottom']),
};

const formattingName = (name, type) => {
	switch (type) {
		case 'top':
			return name + ' (верх)';

		case 'bottom':
			return name + ' (низ)';

		default:
			return name;
	}
};
const Ingredient = (props) => {
	const {
		item,
		type,
		onClose,
	} = props;

	const handleClose = () => {
		onClose(item);
	};

	return (
		<>
			{ !type &&
				<div className={ styles.drag }>
					<DragIcon type="primary" />
				</div>
			}
			<ConstructorElement
				type={ type }
				isLocked={ Boolean(type) }
				text={ formattingName(item.name, type) }
				price={ item.price }
				thumbnail={ item.image }
				handleClose={ handleClose }
			/>
		</>
	)
};

const ConstructorIngredient = (props) => {
	return (
		<div className={ styles.item }>
			<Ingredient { ...props } />
		</div>
	)
};

export const DraggableConstructorIngredient = (props) => {
	const {
		index,
		item,
	} = props;
	const ref = React.useRef(null);
	const dispatch = useDispatch();

	const [{ handlerId }, drop] = useDrop({
		accept: 'constructor',
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			
			if (dragIndex === hoverIndex) {
				return;
			}
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			
			dispatch({
				type: MOVE_INGREDIENT,
				movedTo: hoverIndex,
				movedFrom: dragIndex,
			});
			
			item.index = hoverIndex;
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: 'constructor',
		item: () => {
			return { id: item._id, index };
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	drag(drop(ref));

	return (
		<div ref={ ref }
			className={ cn(styles.item, { [styles.item_move]: isDragging }) }
			data-handler-id={ handlerId }
		>
			<Ingredient { ...props } />
		</div>
	)
};


export default ConstructorIngredient;

Ingredient.propTypes = ingredietnProtoTypes;
ConstructorIngredient.propTypes = ingredietnProtoTypes;
DraggableConstructorIngredient.propTypes = {
	index: PropTypes.number.isRequired,
	...ingredietnProtoTypes,
};
