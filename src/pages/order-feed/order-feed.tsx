import { FC, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from  '../../services/hooks';
import { getIdsWithStatus } from '../../services/helpers';
import { wsCloseConnetion, wsConnectionInit } from '../../services/actions/ws-orders-all-actions';

import cn from 'classnames';
import styles from './order-feed.module.css';

import OrderItem from '../../components/order-item/order-item';

const OrderFeed: FC = () => {
	const {
		orders,
		total,
		totalToday,
	} = useSelector(store => store.orders.ordersAll);
	const { done, inwork } = getIdsWithStatus(orders);
	const location = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(wsConnectionInit());

		return () => {
			dispatch(wsCloseConnetion())
		};
	}, [dispatch]);

	if (!orders.length) {
		return <p className="text text_type_main-medium">Загрузка</p>;
	}

	return (
		<>
			<h1 className="text text_type_main-large mb-5">Лента заказов</h1>
			<div className="row">
				<section className="col-6">
					<div className={ cn(styles.feeds, 'custom-scroll') }>
						{ orders.map(order => {
							return (
								<div key={ order._id } className={ cn(styles.order, 'pb-4') }>
									<Link
										to={{
											pathname: `/feed/${ order._id }`,
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
				</section>
				<section className="col-6">
					<div className="row mb-15">
						<div className="col-6">
							<p className="text text_type_main-medium mb-6">Готовы:</p>
							<ul className={ cn(styles.column, 'list-without-style') }>
								{ done.map(id => (
									<li key={ id } className="text text_type_digits-default text_color_success">{ id }</li>
								)) }
							</ul>
						</div>
						<div className="col-6">
							<p className="text text_type_main-medium mb-6">В работе:</p>
							<ul className={ cn(styles.column, 'list-without-style') }>
								{ inwork.map(id => (
									<li key={ id } className="text text_type_digits-default">{ id }</li>
								)) }
							</ul>
						</div>
					</div>
					<p className="text text_type_main-medium">Выполнено за все время:</p>
					<p className="text text_type_digits-large pb-15 text-shadow">{ total }</p>
					<p className="text text_type_main-medium">Выполнено за сегодня:</p>
					<p className="text text_type_digits-large text-shadow">{ totalToday }</p>
				</section>
			</div>
		</>
	);
};

export default OrderFeed;