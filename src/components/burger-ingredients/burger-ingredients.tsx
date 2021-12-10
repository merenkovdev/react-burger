import styles from './burger-ingredients.module.css';

import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../ingredient/ingredient';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

import cn from 'classnames';

interface IItem {
	_id: string,
	name: string,
	price: number,
	image: string,
	image_large: string,
	type: string,
	fat: number,
	calories: number,
	proteins: number,
	carbohydrates: number,
}

interface ITab {
	type: string,
	name: string,
}

const tabsData: ITab[] = [
	{ type: 'bun', name: 'Булки' },
	{ type: 'sauce', name: 'Соусы' },
	{ type: 'main', name: 'Начинки' },
];

const getTabName = (type: string) => (
	tabsData.find(tab => tab.type === type) || {}
).name;

const TabHeader = (props: {
	activeTab: string,
	setCurrent: (activeTab: string) => void
}) => {
	const { activeTab, setCurrent } = props;

	return (
		<>
			<div className={ styles.tabs }>
				{ tabsData.map(item => (
					<Tab value={ item.type }
						key={ item.type }
						active={ activeTab === item.type }
						onClick={ setCurrent }
					>{item.name}</Tab>
				)) }
			</div>
		</>
	)
}

const TabContent = (props: {
	activeTab: string,
	data: IItem[],
	onClickCard: (id: string) => void,
}) => {
	const {
		activeTab,
		data,
		onClickCard,
	} = props;

	return (
		<div className={ cn('mt-10 custom-scroll', styles.tabsContainer) }>
			<h2 className="text text_type_main-medium">
				{ getTabName(activeTab) }
			</h2>
			<div className={ styles.ingredients }>
				{ data
					.filter(item => item.type === activeTab)
					.map(item => (
						<div className={ cn(styles.ingredient, 'p-3') } key={item._id}>
							<Ingredient { ...item } count={1} onClickCard={ onClickCard } />
						</div>
					))
				}
			</div>
		</div>
	);
};

const BurgerIngredients = (props: { data: IItem[]}) => {
	const [ activeTab, setCurrent ] = React.useState('bun');
	const [ state, setState ] = React.useState({
		activeTab: 'bun',
		itemDetails: {} as IItem,
		modalIsOpen: false,
	});

	const closeModal= () => {
		setState({
			...state,
			itemDetails: {} as IItem,
			modalIsOpen: false,
		})
	}

	const openModalIngredient = (id: string) => {
		const item = props.data.find(item => item._id === id) || {} as IItem;

		setState({
			...state,
			itemDetails: item,
			modalIsOpen: true,
		});
	}

	return (
		<section className="col-6">
			<TabHeader activeTab={ activeTab } setCurrent={ setCurrent } />
			<TabContent activeTab={ activeTab } data={ props.data } onClickCard={ openModalIngredient } />
			{ state.modalIsOpen &&
				state.itemDetails &&
				<Modal open={ state.modalIsOpen }
					onClose={ closeModal }
					header='Детали ингредиента'
				>
					<IngredientDetails {...state.itemDetails} />
				</Modal>
			}
		</section>
	);
};

export default BurgerIngredients;