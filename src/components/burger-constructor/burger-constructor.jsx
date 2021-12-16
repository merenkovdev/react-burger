import styles from './burger-constructor.module.css';

import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from '../../utils/utils';

import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientConstructor from '../ingredient-constructor/ingredient-constructor';
import cn from 'classnames';
import DataContext from '../../services/data-context';
import ModalContext from '../../services/modal-context';
import OrderContext from '../../services/order-context';

import { API_ORDERS } from '../../utils/constants';
import { checkResponse } from '../../utils/utils';

const getRandomIngredients = (ingredients) => (
	ingredients.slice(0, Math.ceil(Math.random() * ingredients.length))
);

const getIngredientsIds = (bun, toppings) => (
	[ bun._id, ...toppings.map(topping => topping._id) ]
);

const createOrder = (data) => new Promise((resolve, reject) => {
	try {
		fetch(API_ORDERS, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		})
			.then(checkResponse)
			.then(response => {
				if (!response.success) {
					const error = new Error('Данные о заказе не получены');
					reject(error);
				}
				resolve(response);
			})
			.catch(err => reject(err));
	} catch (error) {
		console.warn(error);
	}
});

const Total = (props) => {
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
	const {
		ingredients,
		burger: {
			bun,
			toppings,
			totalPrice,
		},
		burgerDispatch,
	} = React.useContext(DataContext);
	const { openModalOrder } = React.useContext(ModalContext);
	const {
		// TODO: Убрать, возможно лишнее условие
		// order,
		orderDispatch,
	} = React.useContext(OrderContext);

	const onOrder = () => {
		createOrder({
			ingredients: getIngredientsIds(bun, toppings)
		})
			.then(res => {
				const {
					order: {
						name,
						number,
					},
				} = res;

				orderDispatch({
					type: 'create-order',
					payload: { number, name },
				});
				openModalOrder();
			})
			.catch(() => {
				orderDispatch({ type: 'create-order-error' });
				openModalOrder();
			});
		;
	};

	const handleOrder = () => {
		// TODO: Убрать, возможно лишнее условие
		// if (order.number) {
		// 	openModalOrder();
		// 	return;
		// }
		onOrder();
	};

	React.useEffect(() => {
		// TODO: Убрать. Временное заполнение данными конструктора.
		const bun = ingredients.find(item => item.type === 'bun');
		const toppings = ingredients
			.filter(item => item.type !== 'bun');

		burgerDispatch({ type: 'add-bun', payload: bun });
		burgerDispatch({ type: 'add-toppings', payload: getRandomIngredients(toppings) });
	}, [ ingredients, burgerDispatch ]);

	React.useEffect(() => {
		burgerDispatch({ type: 'calc-total-price' });
	}, [ bun, toppings, burgerDispatch ]);

	return (
		<section className="col-6">
			{ (!isEmpty(bun) || toppings.length) &&
				<>
					<ul className={ styles.list }>
						{ bun &&
							<li className={ styles.item }>
								<IngredientConstructor item={ bun } type="top" />
							</li>
						}
						<li className={ cn(styles.listContainer, 'custom-scroll') }>
							<ul className={ cn(styles.list) }>
								{ toppings
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
					<Total price={ totalPrice} onOrder={ handleOrder } />
				</>
			}
		</section>
	);
};

export default BurgerConstructor;

Total.propTypes = {
	price: PropTypes.number,
	onOrder: PropTypes.func,
};
