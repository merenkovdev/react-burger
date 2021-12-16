import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';

import Ingredient from '../ingredient/ingredient';
import cn from 'classnames';

import { itemPropTypes } from '../../utils/types';

const keysCaloriesContent = [
	[ 'fat', 'Калории,ккал'],
	[ 'calories', 'Белки, г',],
	[ 'proteins', 'Жиры, г'],
	[ 'carbohydrates', 'Углеводы, г'],
];

const classesText = 'text text_type_main-default text_color_inactive';
const classesTextDigits = 'text text_type_digits-default text_color_inactive';

const СalorieСontent = (props) => {
	return (
		<ul className={ cn(styles.list, 'pt-4') }>
			{ keysCaloriesContent.map(([ key, name ]) => (
				<li className={ styles.item } key={ key }>
					<div className={ classesText }>{ name }</div>
					<div className={ cn(classesTextDigits, 'mt-2') }>{ props[key] }</div>
				</li>
			)) }
		</ul>
	);
};

const IngredientDetails = ({ item }) => {
	const {
		price,
		fat,
		calories,
		proteins,
		carbohydrates,
		...otherProps
	} = item;

	return (
		<>
			<Ingredient size="large" item={ otherProps } />
			<СalorieСontent
				fat={ fat }
				calories={ calories }
				proteins={ proteins }
				carbohydrates={ carbohydrates }
			/>
		</>
	)
};

export default IngredientDetails;

СalorieСontent.propTypes = {
	fat: PropTypes.number.isRequired,
	calories: PropTypes.number.isRequired,
	proteins: PropTypes.number.isRequired,
	carbohydrates: PropTypes.number.isRequired,
};

IngredientDetails.propTypes = {
	item: PropTypes.shape(itemPropTypes).isRequired,
};
