import cn from 'classnames';
import styles from './profile-orders.module.css';

import { Link, useLocation } from 'react-router-dom';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import OrderItem from '../../components/order-item/order-item';

const ProfileOrders = () => {
	let location = useLocation();
	const { path } = useRouteMatch();
	console.log(location);


	return (
		<div>
			<div className={ cn(styles.order, "pb-4") }>
				<Link
					key="1"
					to={{
						pathname: `${ path }/1`,
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
						pathname: `${ path }/1`,
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
						pathname: `${ path }/1`,
						state: { background: location }
					}}
				>
					<OrderItem />
				</ Link>
			</div>
		</div>
	);
};

export default ProfileOrders;