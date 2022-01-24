import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

const ModalDetails = () => {
	const history = useHistory();
	const clearDetailIngredients = () => {
		history.push('/');
	};
	const ingredients = useSelector(store => store.ingredients.items);

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
