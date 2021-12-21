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
import OrderContext from '../../services/order-context';

import { useSelector, useDispatch } from 'react-redux';
import { SHOW_MODAL } from '../../services/actions/modal';
import {
	ADD_BUN,
	ADD_TOPPING,
	CALC_TOTAL_PRICE,
} from '../../services/actions/burger';
import { MODAL_ORDER } from '../../utils/constants';
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
	return (
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
	const ingredients = useSelector(store => store.ingredients.items);
	const {
		bun,
		toppings,
		totalPrice,
	} = useSelector(store => store.burger);
	const dispatch = useDispatch();

	const openModalOrder = () => {
		dispatch({ type: SHOW_MODAL, name: MODAL_ORDER });
	};

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

		dispatch({ type: ADD_BUN, bun });
		dispatch({ type: ADD_TOPPING, toppings: getRandomIngredients(toppings) });
	}, [ ingredients, dispatch ]);

	React.useEffect(() => {
		dispatch({ type: CALC_TOTAL_PRICE });
	}, [ bun, toppings, dispatch ]);

	return (
		<section className="col-6">
			{ (!isEmpty(bun) || Boolean(toppings.length)) &&
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
