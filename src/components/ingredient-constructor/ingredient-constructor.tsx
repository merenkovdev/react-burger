import styles from './ingredient-constructor.module.css';
import React, { FC } from 'react';

import { useDispatch } from '../../services/hooks';
import { useDrag, useDrop } from 'react-dnd';
import type { XYCoord, Identifier } from 'dnd-core'
import cn from 'classnames';

import { moveIngredientAction } from '../../services/actions/burger';

import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import {
	isTopping,
	TTypeConstructorIngredient,
	TConstructorIngredient,
	TDraggableConstructorIngredient,
} from '../../types/ingredient';

type DragItem = {
	index: number;
	id: string;
};

const formattingName = (name: string, type?: TTypeConstructorIngredient) => {
	switch (type) {
		case 'top':
			return name + ' (верх)';

		case 'bottom':
			return name + ' (низ)';

		default:
			return name;
	}
};

const Ingredient: FC<TConstructorIngredient> = (props) => {
	const {
		item,
		type,
		onClose,
	} = props;

	const handleClose = () => {
		if (typeof onClose === 'function' && isTopping(item)) {
			onClose(item);
		}
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

const ConstructorIngredient: FC<TConstructorIngredient> = (props) => {
	return (
		<div className={ styles.item }>
			<Ingredient { ...props } />
		</div>
	)
};

export const DraggableConstructorIngredient: FC<TDraggableConstructorIngredient> = (props) => {
	const {
		index,
		item,
	} = props;
	const ref = React.useRef<HTMLDivElement>(null);
	const dispatch = useDispatch();

	const [{ handlerId }, drop] = useDrop<
		DragItem,
		void,
		{ handlerId: Identifier | null }
	>({
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
			const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}

			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}

			dispatch(moveIngredientAction(hoverIndex, dragIndex));

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
