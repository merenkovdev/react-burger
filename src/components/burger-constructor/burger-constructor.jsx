import styles from './burger-constructor.module.css';

import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from '../../utils/utils';

import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientConstructor, { DraggableConstructorIngredient } from '../ingredient-constructor/ingredient-constructor';
import cn from 'classnames';

import { useSelector, useDispatch } from 'react-redux';
import { SHOW_MODAL } from '../../services/actions/modal';
import {
	CALC_TOTAL_PRICE,
	REMOVE_IMGREDIENT,
	addIngredient,
} from '../../services/actions/burger';
import {
	DECREASE_ADDED_INGREDIENT,
	INCREASE_ADDED_INGREDIENT,
} from '../../services/actions/ingredients';
import { MODAL_ORDER } from '../../utils/constants';
import { createOrder } from '../../services/actions/order';
import { useDrop } from 'react-dnd';

const getIngredientsIds = (bun, toppings) => (
	[ bun._id, ...toppings.map(topping => topping._id) ]
);

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
	const {
		bun,
		toppings,
		totalPrice,
	} = useSelector(store => store.burger);
	const dispatch = useDispatch();

	const openModalOrder = () => {
		dispatch({ type: SHOW_MODAL, name: MODAL_ORDER });
	};

	const handleOrder = () => {
		dispatch(
			createOrder({
				ingredients: getIngredientsIds(bun, toppings)
			})
		).finally(openModalOrder);
	};

	const handleRemoveTopping = (item) => {
		dispatch({ type: REMOVE_IMGREDIENT, uid: item.uid });
		dispatch({
			type: DECREASE_ADDED_INGREDIENT,
			item,
		});
	};

	React.useEffect(() => {
		dispatch({ type: CALC_TOTAL_PRICE });
	}, [ bun, toppings, dispatch ]);

	const [, dropTarget] = useDrop({
		accept: 'ingredient',
		drop(item) {
			dispatch(addIngredient(item._id));
			dispatch({
				type: INCREASE_ADDED_INGREDIENT,
				item,
			});
		},
	});

	return (
		<section className="col-6" ref={ dropTarget }>
			{ (isEmpty(bun) && !toppings.length) ?
				(
					<div className={ styles.stub }>
						<p className="text text_type_main-large">Перетащите сюда ингредиенты</p>
					</div>
				) : (
					<>
						<ul className={ styles.list }>
							{ !isEmpty(bun) &&
								<li>
									<IngredientConstructor item={ bun } type="top" />
								</li>
							}
							<li className={ cn(styles.listContainer, 'custom-scroll') }>
								<ul className={ cn(styles.list) }>
									{ toppings
										.map((item, index) => {
											return (
												<li className={ styles.item } key={ item.uid }>
													<DraggableConstructorIngredient item={ item }
														index={ index }
														onClose={ handleRemoveTopping }
													/>
												</li>
											);
										})
									}
								</ul>
							</ li>
							{ !isEmpty(bun) &&
								<li>
									<IngredientConstructor item={ bun } type="bottom" />
								</li>
							}
						</ul>
						<Total price={ totalPrice} onOrder={ handleOrder } />
					</>
				)
			}
		</section>
	);
};

export default BurgerConstructor;

Total.propTypes = {
	price: PropTypes.number,
	onOrder: PropTypes.func,
};
