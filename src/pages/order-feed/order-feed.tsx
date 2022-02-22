import { FC } from 'react';
import OrderItem from '../../components/order-item/order-item';
import { Link, useLocation } from 'react-router-dom';

import cn from 'classnames';
import styles from './order-feed.module.css';

const OrderFeed: FC = () => {
	let location = useLocation();

	return (
		<>
			<h1 className="text text_type_main-large mb-5">Лента заказов</h1>
			<div className="row">
				<section className="col-6">
					<div className={ cn(styles.order, "pb-4") }>
						<Link
							key="1"
							to={{
								pathname: `/feed/1`,
								state: { background: location }
							}}
						>
							<OrderItem />
						</ Link>
					</div>
					<div className={ cn(styles.order, "pb-4") }>
						<Link
							key="2"
							to={{
								pathname: `/feed/2`,
								state: { background: location }
							}}
						>
							<OrderItem />
						</ Link>
					</div>
					<div className={ cn(styles.order, "pb-4") }>
						<Link
							key="2"
							to={{
								pathname: `/feed/3`,
								state: { background: location }
							}}
						>
							<OrderItem />
						</ Link>
					</div>
				</section>
				<section className="col-6">
					<div className="row mb-15">
						<div className="col-6">
							<p className="text text_type_main-medium mb-6">Готовы:</p>
							<ul className="list-without-style">
								<li className="text text_type_main-medium text_color_success">034533</li>
								<li className="text text_type_main-medium text_color_success">034533</li>
								<li className="text text_type_main-medium text_color_success">034533</li>
								<li className="text text_type_main-medium text_color_success">034533</li>
							</ul>
						</div>
						<div className="col-6">
							<p className="text text_type_main-medium mb-6">В работе:</p>
							<ul className="list-without-style">
								<li className="text text_type_main-medium">034533</li>
								<li className="text text_type_main-medium">034533</li>
								<li className="text text_type_main-medium">034533</li>
								<li className="text text_type_main-medium">034533</li>
							</ul>
						</div>
					</div>
					<p className="text text_type_main-medium">Выполнено за все время:</p>
					<p className="text text_type_digits-large pb-15 text-shadow">28 752</p>
					<p className="text text_type_main-medium">Выполнено за сегодня:</p>
					<p className="text text_type_digits-large text-shadow">28 752</p>
				</section>
			</div>
		</>
	);
};

export default OrderFeed;