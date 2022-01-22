import { useDispatch } from 'react-redux';

import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { CLEAR_INGREDIENTS_DETAILS } from '../../services/actions/ingredients';

const ModalDetails = () => {
	const dispatch = useDispatch();
	const clearDetailIngredients = () => {
		dispatch({ type: CLEAR_INGREDIENTS_DETAILS });
	};

	return (
		<Modal open={ true }
			header='Детали ингредиента'
			onClose={clearDetailIngredients}
		>
			<IngredientDetails />
		</Modal>
	)
};

export default ModalDetails;
