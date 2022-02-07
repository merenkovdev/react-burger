import { useSelector } from 'react-redux';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';

const IngredientPage = () => {
	const {
		isRequested,
		hasError,
		items,
	} = useSelector(store => store.ingredients);

	if (isRequested) {
		return (
			<p className="text text_type_main-large p-10">
				Загрузка...
			</p>
		);
	}

	if (hasError) {
		return (
			<p className="text text_type_main-large p-10">
				Ошибка при получнии ингредиентов...
			</p>
		);
	}

	if (!items?.length) {
		return null;
	}

	return (
		<IngredientDetails />
	)
};

export default IngredientPage;
