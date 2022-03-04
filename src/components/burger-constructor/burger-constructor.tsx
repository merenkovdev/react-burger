import styles from './burger-constructor.module.css';

import React, { FC } from 'react';
import cn from 'classnames';
import { useHistory } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import { isEmpty } from '../../utils/utils';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../price/price';
import ConstructorIngredient, { DraggableConstructorIngredient } from '../ingredient-constructor/ingredient-constructor';

import { useSelector, useDispatch } from  '../../services/hooks';
import { SHOW_MODAL } from '../../services/actions/modal';
import {
	REMOVE_IMGREDIENT,
	CLEAR_CONSTRUCTOR,
	calcTotalPrice,
	addIngredient,
} from '../../services/actions/burger';
import {
	DECREASE_ADDED_INGREDIENT,
	INCREASE_ADDED_INGREDIENT,
	CLEAR_ADDED_INGREDIENT,
} from '../../services/actions/ingredients';
import { MODAL_ORDER } from '../../utils/constants';
import { CREATE_ORDER_FAILED, createOrder } from '../../services/actions/burger';
import { TTopping } from '../../types/ingredient';
import {
	TItem,
} from '../../types/api';

export type TTotal = {
	price: number,
	onOrder: () => void,
};

const Total: FC<TTotal> = ({ price, onOrder }) => {
	const createOrderRequest = useSelector(store => store.burger.order.isRequested);

	return (
		<div className={ cn(styles.total, 'pt-10') }>
			<div className="pr-10">
				<Price text={ price } size="medium" />
			</div>
			<Button type="primary"
				size="large"
				onClick={ onOrder }
				{...(createOrderRequest ? {
					disabled: true,
				} : {})}
			>
				{ createOrderRequest ?
					'...Создание заказа' :
					'Оформить заказ'
				}
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

	const {
		number,
		name,
		success,
	} = useSelector(store => store.burger.order);
	const isAuth = useSelector(store => store.user.isAuth);
	const history = useHistory();

	const dispatch = useDispatch();
	const handleOrder = () => {
		if (!isAuth) {
			history.push({ pathname: '/login' });

			return;
		}

		if (isEmpty(bun)) {
			dispatch({
				textError: 'Пожалуйста, добавьте булку',
				type: CREATE_ORDER_FAILED,
			});
			dispatch({ type: SHOW_MODAL, name: MODAL_ORDER });

			return;
		}

		dispatch(createOrder());
	};

	const handleRemoveTopping = (item: TTopping) => {
		dispatch({ type: REMOVE_IMGREDIENT, uid: item.uid });
		dispatch({
			type: DECREASE_ADDED_INGREDIENT,
			item,
		});
	};

	React.useEffect(() => {
		dispatch(calcTotalPrice([
			...toppings,
			...(bun ? [bun] : []),
		]));
	}, [ bun, toppings, dispatch ]);

	React.useEffect(() => {
		if (success) {
			dispatch({ type: CLEAR_CONSTRUCTOR });
			dispatch({ type: CLEAR_ADDED_INGREDIENT });
			dispatch({ type: SHOW_MODAL, name: MODAL_ORDER });
		}
	}, [ number, name, success, dispatch ]);

	const [, dropTarget] = useDrop({
		accept: 'ingredient',
		drop(item: TItem) {
			dispatch(addIngredient(item._id));
			dispatch({
				type: INCREASE_ADDED_INGREDIENT,
				item,
			});
		},
	});

	return (
		<section className="col-6" ref={ dropTarget }>
			{ (!bun && !toppings.length) ?
				(
					<div className={ styles.stub }>
						<p className="text text_type_main-large">Перетащите сюда ингредиенты</p>
					</div>
				) : (
					<>
						<ul className={ styles.list }>
							{ bun &&
								<li>
									<ConstructorIngredient item={ bun } type="top" />
								</li>
							}
							<li className={ cn(styles.listContainer, 'custom-scroll') }>
								<ul className={ cn(styles.list) }>
									{ toppings
										.map((item: TTopping, index: number) => {
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
							{ bun &&
								<li>
									<ConstructorIngredient item={ bun } type="bottom" />
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
