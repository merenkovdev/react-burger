import styles from './burger-constructor.module.css';

import React from 'react';
import PropTypes from 'prop-types';

import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientConstructor from '../ingredient-constructor/ingredient-constructor';
import cn from 'classnames';

const Total = (props) => (
	<div className={ cn(styles.total, 'pt-10') }>
		<span className="text text_type_digits-medium pr-10">
			{ props.price } <CurrencyIcon type="primary" />
		</span>
		<Button type="primary" size="large" onClick={ props.onOrder }>
			Оформить заказ
		</Button>
	</div>
);

const BurgerConstructor = (props) => {
	const {
		data,
		openModal,
	} = props;
	const totalPrice = React.useMemo(() =>
		data.reduce((acum, current) => acum + current.price, 0),
		[data]
	);
	const bun = React.useMemo(() =>
		data.find(item => item.type === 'bun'),
		[ data ]
	);
	const ingredientsWitoutBun = React.useMemo(() =>
		data.filter(item => item.type !== 'bun'),
		[ data ]
	);

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
						{ ingredientsWitoutBun
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
	})).isRequired,
	openModal: PropTypes.func.isRequired,
};
