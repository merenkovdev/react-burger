import styles from './ingredient-constructor.module.css';
import PropTypes from 'prop-types'

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

export default Ingredient;

Ingredient.propTypes = {
	item: PropTypes.shape(itemPropTypes).isRequired,
	type: PropTypes.oneOf(['top', 'bottom']),
};
