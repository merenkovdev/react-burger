import styles from './ingredient-constructor.module.css';
import React from 'react';

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';

import { MOVE_INGREDIENT } from '../../services/actions/burger';

import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { itemPropTypes } from '../../utils/types';

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
			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return;
			}
			// Determine rectangle on screen
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			// Get vertical middle
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			// Determine mouse position
			const clientOffset = monitor.getClientOffset();
			// Get pixels to the top
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%
			// Dragging downwards
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			// Dragging upwards
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			// Time to actually perform the action
			// moveCard(dragIndex, hoverIndex);
			dispatch({ type: MOVE_INGREDIENT, movedTo: hoverIndex, movedFrom: dragIndex });
			console.log(dragIndex, hoverIndex);
			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
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

	const style = {
		cursor: 'move',
	};

	const opacity = isDragging ? 0 : 1;

	return (
		<div ref={ ref } style={{ ...style, opacity }}  className={ styles.item } data-handler-id={ handlerId }>
			<Ingredient { ...props } />
		</div>
	)
};


export default ConstructorIngredient;

Ingredient.propTypes = {
	item: PropTypes.shape(itemPropTypes).isRequired,
	type: PropTypes.oneOf(['top', 'bottom']),
};
