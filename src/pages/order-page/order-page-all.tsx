import { FC, useEffect } from 'react';

import Order from './order';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { wsCloseConnetion, wsConnectionInit } from '../../services/actions/ws-orders-all-actions';

const OrderPageAll: FC = () => {
	const { id } = useParams<{ id: string | undefined }>();
	const {	orders, wsConnected } = useSelector(store => store.orders.ordersAll);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(wsConnectionInit());

		return () => {
			dispatch(wsCloseConnetion())
		};
	}, [dispatch]);

	if (!wsConnected || !orders.length) {
		return <p className="text text_type_main-medium">Загрузка</p>;
	}

	const order = orders.find(item => item._id === id);

	if (!order) {
		return <p className="text text_type_main-medium">Заказ не найден</p>;
	}

	return <Order orderData={ order } />;
};

export default OrderPageAll;
