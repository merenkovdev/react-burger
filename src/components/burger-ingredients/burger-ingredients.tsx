import styles from './burger-ingredients.module.css';

import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from './ingredient';
import cn from 'classnames';

interface Item {
	type: string,
	_id: string,
}

interface Tab {
	type: string,
	name: string,
}

const tabsData: Tab[] = [
	{ type: 'bun', name: 'Булки' },
	{ type: 'sauce', name: 'Соусы' },
	{ type: 'main', name: 'Начинки' },
];

const getTabName = (type: string) => (
	tabsData.find(tab => tab.type === type) || {}
).name;

const TabIngredients = (props: { data: Item[] }) => {
	const [current, setCurrent] = React.useState('bun');

	return (
		<>
			<div className={ styles.tabs }>
				{ tabsData.map(item => (
					<Tab value={item.type}
						key={item.type}
						active={current === item.type}
						onClick={setCurrent}
					>{item.name}</Tab>
				)) }
			</div>

			<div className={ cn('pt-10 custom-scroll', styles.tabsContainer) }>
				<h2 className="text text_type_main-medium">
					{ getTabName(current) }
				</h2>
				<div className={ styles.ingredients }>
					{ props.data
						.filter(item => item.type === current)
						.map(item => (
							<div className={ cn(styles.ingredient, 'p-3') } key={item._id}>
								<Ingredient { ...item } />
							</div>
						))
					}
				</div>
			</div>
		</>
	)
}

const BurgerIngredients = (props: { data: Item[]}) => {
	return (
		<section className="col-6">
			<TabIngredients data={ props.data } />
		</section>
	);
};

export default BurgerIngredients;