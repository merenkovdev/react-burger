import styles from './ingredient-constructor.module.css';
import PropTypes from 'prop-types'

import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

type TypeElem = 'top' | 'bottom' | undefined;

interface IItem {
	name: string,
	price: number,
	image: string,
	type: string,
	_id: string,
}

const formattingName = (name: string, type?: TypeElem) => {
	switch (type) {
		case 'top':
			return name + ' (верх)';

		case 'bottom':
			return name + ' (низ)';

		default:
			return name;
	}
};

const Ingredient = (props: { item: IItem, type?: TypeElem }) => {
	const { item, type } = props;

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
			/>
		</>
	)
};

export default Ingredient;

Ingredient.propTypes = {
	item: PropTypes.shape({
		_id: PropTypes.string,
		type: PropTypes.string,
		name: PropTypes.string,
		price: PropTypes.number,
		image: PropTypes.string,
	}).isRequired,
	type: PropTypes.oneOf(['top', 'bottom']),
};
