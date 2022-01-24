import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { getIngredients } from '../../services/actions/ingredients';

const IngredientPage = () => {
	const {
		items,
		isRequested,
		hasError,
	 } = useSelector(store => store.ingredients);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getIngredients());
	}, [ dispatch ]);

	if (hasError) {
		return (
			<p className="text text_type_main-default p-10">
				Ошибка при получнии ингредиентов...
			</p>
		);
	}

	if (!items.length || isRequested) {
		return (
			<p className="text text_type_main-default p-10">
				Загрузка...
			</p>
		);
	}

	return (
		<IngredientDetails ingredients={ items } />
	)
};

export default IngredientPage;
