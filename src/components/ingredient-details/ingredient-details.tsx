import styles from './ingredient-details.module.css';

import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { TItem, TCalories } from '../../types/api';

import Ingredient from '../ingredient/ingredient';

const keysCaloriesContent: [name: keyof TCalories, value: string][] = [
	['fat', 'Калории,ккал'],
	['calories', 'Белки, г',],
	['proteins', 'Жиры, г'],
	['carbohydrates', 'Углеводы, г'],
];

const classesText = 'text text_type_main-default text_color_inactive';
const classesTextDigits = 'text text_type_digits-default text_color_inactive';

const СalorieСontent: FC<TCalories> = (props) => {
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

const IngredientDetails: FC = () => {
	const { id } = useParams<{ id: string | undefined }>();
	// TODO: Типизация store
	// @ts-ignore
	const ingredients: Array<TItem> = useSelector(store => store.ingredients.items);

	const ingredient = ingredients.find(item => item._id === id);

	if (!ingredient) {
		return null;
	}

	const {
		// Убрали свойство price из объекта
		price,
		fat,
		calories,
		proteins,
		carbohydrates,
		...otherProps
	} = ingredient;

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
