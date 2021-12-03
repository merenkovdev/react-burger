import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from './ingredient';

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
	{ type: 'sauces', name: 'Соусы' },
	{ type: 'main', name: 'Начинки' },
];

const getTabName = (type: string) => (
	tabsData.find(tab => tab.type === type) || {}
).name;

const TabIngredients = (props: { data: Item[] }) => {
	const [current, setCurrent] = React.useState('bun');

	return (
		<>
			<div style={{ display: 'flex' }}>
				{ tabsData.map(item => (
					<Tab value={item.type} active={current === item.type} onClick={setCurrent}>
						{item.name}
					</Tab>
				)) }
			</div>

			<div className="pt-10">
				<h2 className="text text_type_main-medium">{ getTabName(current) }</h2>
				<div className="row">
					{ props.data
						.filter(item => item.type === current)
						.map(item => (
							<div className="col-6">
								<Ingredient {...item} />
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
			<TabIngredients data={props.data} />
		</section>
	);
};

export default BurgerIngredients;