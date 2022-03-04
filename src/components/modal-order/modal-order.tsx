import { FC } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import Modal from '../modal/modal';
import Order from '../order/order';
import { TOrderLocation } from '../../types';

const ModalOrder: FC = () => {
	const history = useHistory();
	const location = useLocation<TOrderLocation>();
	const orderData = location.state.order;

	return (
		<Modal open={ true } onClose={() => history.goBack()}>
			<Order orderData={ orderData } />
		</Modal>
	);
};

export default ModalOrder;