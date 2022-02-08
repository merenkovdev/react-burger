import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

const ModalDetails: FC = () => {
	const history = useHistory();

	const clearDetailIngredients = () => {
		history.push('/');
	};

	return (
		<Modal open={ true }
			header='Детали ингредиента'
			onClose={ clearDetailIngredients }
		>
			<IngredientDetails />
		</Modal>
	)
};

export default ModalDetails;
