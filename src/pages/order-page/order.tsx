import { FC } from 'react';

import Order from '../../components/order/order';
import { TOrder } from '../../types/api';

const OrderContainer: FC<{ orderData: TOrder }> = ({ orderData }) => {
	return (
		<div className="container-small pt-30 pb-10">
			<Order orderData={ orderData } />
		</div>
	);
};

export default OrderContainer;
