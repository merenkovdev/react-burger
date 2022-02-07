import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

const ModalDetails = () => {
	const history = useHistory();
	const ingredients = useSelector(store => store.ingredients.items);

	const clearDetailIngredients = () => {
		history.push('/');
	};

	return (
		<Modal open={ true }
			header='Детали ингредиента'
			onClose={ clearDetailIngredients }
		>
			<IngredientDetails ingredients={ ingredients } />
		</Modal>
	)
};

export default ModalDetails;
