import React, { FC } from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';

import cn from 'classnames';
import styles from './profile-orders.module.css';

import { useSelector, useDispatch } from  '../../services/hooks';
import OrderItem from '../../components/order-item/order-item';
import { wsConnectionInit, wsCloseConnetion } from '../../services/actions/ws-orders-user-actions';

const ProfileOrders: FC = () => {
	const location = useLocation();
	const { path } = useRouteMatch();
	const { orders } = useSelector(store => store.orders.ordersUser);
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(wsConnectionInit());

		return () => {
			dispatch(wsCloseConnetion())
		};
	}, [dispatch]);

	if (!orders.length) {
		return <p className="text text_type_main-medium">Загрузка</p>;
	}

	return (
		<div className={ cn(styles.orders, 'custom-scroll') }>
			{ orders.map(order => {
				return (
					<div key={ order._id } className={ cn(styles.order, 'pb-4') }>
						<Link
							to={{
								pathname: `${ path }/${ order._id }`,
								state: {
									order,
									background: location,
								}
							}}
						>
							<OrderItem order={ order } />
						</ Link>
					</div>
				);
			}) }
		</div>
	);
};

export default ProfileOrders;