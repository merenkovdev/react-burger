import styles from './burger-constructor.module.css';

import React from 'react';
import PropTypes from 'prop-types';

import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientConstructor from '../ingredient-constructor/ingredient-constructor';
import cn from 'classnames';
import DataContext from '../../services/data-context';
import ModalContext from '../../services/modal-context';

const Total = (props) => {
	// const { data } = React.useContext(DataContext);

	return(
		<div className={ cn(styles.total, 'pt-10') }>
			<span className="text text_type_digits-medium pr-10">
				{ props.price } <CurrencyIcon type="primary" />
			</span>
			<Button type="primary" size="large" onClick={ props.onOrder }>
				Оформить заказ
			</Button>
		</div>
	);
};

const BurgerConstructor = () => {
	const { ingredients } = React.useContext(DataContext);
	const { openModalOrder } = React.useContext(ModalContext);

	const totalPrice = React.useMemo(() =>
		ingredients.reduce((acum, current) => acum + current.price, 0),
		[ ingredients ]
	);

	const bun = React.useMemo(() =>
		ingredients.find(item => item.type === 'bun'),
		[ ingredients ]
	);
	const ingredientsWitoutBun = React.useMemo(() =>
		ingredients.filter(item => item.type !== 'bun'),
		[ ingredients ]
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
			<Total price={ totalPrice} onOrder={ openModalOrder } />
		</section>
	);
};

export default BurgerConstructor;

Total.propTypes = {
	price: PropTypes.number,
	onOrder: PropTypes.func,
};
