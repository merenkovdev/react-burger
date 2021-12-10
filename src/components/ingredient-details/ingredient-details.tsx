import styles from './ingredient-details.module.css';

import Ingredient from '../ingredient/ingredient';
import cn from 'classnames';

interface IIngredientDetails {
	_id: string,
	image: string,
	image_large: string,
	name: string,
	fat: number,
	calories: number,
	proteins: number,
	carbohydrates: number,
	price?: number,
	onClickCard?: () => void,
}

interface IСalorieСontent {
	[fat: string ]: number,
	calories: number,
	proteins: number,
	carbohydrates: number,
}

const keysCaloriesContent: [key: string, name: string][] = [
	[ 'fat', 'Калории,ккал'],
	[ 'calories', 'Белки, г',],
	[ 'proteins', 'Жиры, г'],
	[ 'carbohydrates', 'Углеводы, г'],
];

const classesTxt = 'text text_type_main-default text_color_inactive';
const classesTxtNum = 'text text_type_digits-default text_color_inactive';

const СalorieСontent = (props: IСalorieСontent) => {
	return (
		<ul className={ cn(styles.list, 'pt-4') }>
			{ keysCaloriesContent.map(([ key, name ]) => (
				<li className={ styles.item } key={ key }>
					<div className={ classesTxt }>{ name }</div>
					<div className={ cn(classesTxtNum, 'mt-2') }>{ props[key] }</div>
				</li>
			)) }
		</ul>
	);
};

const IngredientDetails = (props: IIngredientDetails) => {
	const {
		price, // Цена не нужна в деталях ингредиента
		fat,
		calories,
		proteins,
		carbohydrates,
		...otherProps
	} = props;

	return (
		<>
			<Ingredient size="large" { ...otherProps } />
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
