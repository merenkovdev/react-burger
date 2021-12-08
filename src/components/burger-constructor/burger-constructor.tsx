import styles from './burger-constructor.module.css';

import {
	Button,
	DragIcon,
	CurrencyIcon,
	ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';

type TypeElem = 'top' | 'bottom' | undefined;

interface Item {
	name: string,
	price: number,
	image: string,
	type: string,
	_id: string,
}

const formattingName = (name: string, type?: TypeElem) => {
	switch (type) {
		case 'top':
			return name + ' (верх)';

		case 'bottom':
			return name + ' (низ)';

		default:
			return name;
	}
};

const Total = (props: { price: number }) => (
	<div className={ cn(styles.total, 'pt-10') }>
		<span className="text text_type_digits-medium pr-10">
			{ props.price } <CurrencyIcon type="primary" />
		</span>
		<Button type="primary" size="large">
			Оформить заказ
		</Button>
	</div>
);

const Ingredient = (props: { item: Item, type?: TypeElem }) => {
	const { item, type } = props

	return (
		<>
			{ !type &&
				<div className={ styles.drag }>
					<DragIcon type="primary" />
				</div>
			}
			<ConstructorElement
				type={ type }
				isLocked={ Boolean(type) }
				text={ formattingName(item.name, type) }
				price={ item.price }
				thumbnail={ item.image }
			/>
		</>
	)
};

const BurgerConstructor = (props: { data: Item[] }) => {
	const totalPrice = props.data.reduce((acum, current) => acum + current.price, 0);
	const bun = props.data.find(item => item.type === 'bun');

	return (
		<section className="col-6">
			<ul className={ styles.list }>
				{ bun &&
					<li className={ styles.item }>
						<Ingredient item={ bun } type="top" />
					</li>
				}
				<li className={ cn(styles.listContainer, 'custom-scroll') }>
					<ul className={ cn(styles.list) }>
						{ props.data
							.filter(item => item.type !== 'bun')
							.map(item => {
								return (
									<li className={ styles.item } key={ item._id }>
										<Ingredient item={ item } />
									</li>
								);
							})
						}
					</ul>
				</ li>
				{ bun &&
					<li className={ styles.item }>
						<Ingredient item={ bun } type="bottom" />
					</li>
				}
			</ul>
			<Total price={ totalPrice} />
		</section>
	);
};

export default BurgerConstructor;