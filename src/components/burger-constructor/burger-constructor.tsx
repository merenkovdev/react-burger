import styles from './burger-constructor.module.css';

import React from 'react';
import PropTypes from 'prop-types';

import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientConstructor from '../ingredient-constructor/ingredient-constructor';
import cn from 'classnames';

interface Item {
	name: string,
	price: number,
	image: string,
	type: string,
	_id: string,
}

const Total = (props: { price: number, onOrder: () => void }) => (
	<div className={ cn(styles.total, 'pt-10') }>
		<span className="text text_type_digits-medium pr-10">
			{ props.price } <CurrencyIcon type="primary" />
		</span>
		<Button type="primary" size="large" onClick={ props.onOrder }>
			Оформить заказ
		</Button>
	</div>
);

const BurgerConstructor = (props: { data: Item[] }) => {
	const [ modalIsOpen, setModal ] = React.useState(false);

	const closeModal= () => {
		setModal(false);
	}

	const openModal= () => {
		setModal(true);
	}

	const totalPrice = props.data.reduce((acum, current) => acum + current.price, 0);
	const bun = props.data.find(item => item.type === 'bun');

	return (
		<section className="col-6">
			<ul className={ styles.list }>
				{ bun &&
					<li className={ styles.item }>
						<IngredientConstructor item={ bun } type="top" />
					</li>
				}
				<li className={ cn(styles.listContainer, 'custom-scroll') }>
					<ul className={ cn(styles.list) }>
						{ props.data
							.filter(item => item.type !== 'bun')
							.map(item => {
								return (
									<li className={ styles.item } key={ item._id }>
										<IngredientConstructor item={ item } />
									</li>
								);
							})
						}
					</ul>
				</ li>
				{ bun &&
					<li className={ styles.item }>
						<IngredientConstructor item={ bun } type="bottom" />
					</li>
				}
			</ul>
			<Total price={ totalPrice} onOrder={ openModal } />

			{ modalIsOpen &&
				<Modal open={ modalIsOpen }
					onClose={ closeModal }
				>
					<OrderDetails />
				</Modal>
			}
		</section>
	);
};

export default BurgerConstructor;

Total.propTypes = {
	price: PropTypes.number,
	onOrder: PropTypes.func,
};

BurgerConstructor.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string,
		type: PropTypes.string,
		name: PropTypes.string,
		price: PropTypes.number,
		image: PropTypes.string,
	})),
};
