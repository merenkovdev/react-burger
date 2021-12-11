import styles from './burger-ingredients.module.css';

import React from 'react';
import PropTypes from 'prop-types';
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

interface ITabContent {
	data: Record<string, IItem[]>,
	onClickCard: (id: string) => void,
}

const itemPropTypes = PropTypes.shape({
	_id: PropTypes.string,
	name: PropTypes.string,
	price: PropTypes.number,
	image: PropTypes.string,
	image_large: PropTypes.string,
	type: PropTypes.string,
	fat: PropTypes.number,
	calories: PropTypes.number,
	proteins: PropTypes.number,
	carbohydrates: PropTypes.number,
});

const tabNames: Record<string, string> = {
	bun: 'Булки',
	sauce: 'Соусы',
	main: 'Начинки',
};

const TabHeader = (props: {
	activeTab: string,
	tabs: string[],
	setTab: (activeTab: string) => void
}) => {
	const {
		activeTab,
		tabs,
		setTab,
	} = props;

	return (
		<>
			<div className={ styles.tabs }>
				{ tabs.map(key => (
					<Tab value={ key }
						key={ key }
						active={ activeTab === key }
						onClick={ setTab }
					>{ tabNames[key] }</Tab>
				)) }
			</div>
		</>
	)
}

const TabContent = React.forwardRef<HTMLDivElement, ITabContent>((props, ref) => {
	const {
		data,
		onClickCard,
	} = props;

	return (
		<div ref={ ref } className={ cn('mt-10 custom-scroll', styles.tabsContainer) }>
			{ Object.keys(data)
				.map(type => (
					<React.Fragment key={ type }>
						<h2 className="text text_type_main-medium pb-6" id={ type }>
							{ tabNames[type] }
						</h2>
						<ul className={ cn(styles.ingredients, ' pb-10') }>
							{ data[type].map(item => (
								<li className={ cn(styles.ingredient, 'p-3') } key={ item._id } >
									<Ingredient { ...item } count={1} onClickCard={ onClickCard } />
								</li>
							)) }
						</ul>
					</React.Fragment >
				))
			}
		</div>
	);
});

const BurgerIngredients = (props: { data: IItem[]}) => {
	const [ activeTab, setTab ] = React.useState('bun');
	const [ state, setState ] = React.useState({
		itemDetails: {} as IItem,
		modalIsOpen: false,
	});
	const tabContentRef = React.useRef<HTMLDivElement>(null);

	const sortedData = React.useMemo(() => {
		return props.data.reduce((acum, current: IItem) => {
			if (current.type && !acum[current.type]) {
				acum[current.type] = [];
			}

			if (acum[current.type]) {
				acum[current.type].push(current);
			}

			return acum;
		}, {} as Record<string, IItem[]>)
	}, [ props.data ]);

	const closeModal= () => {
		setState({
			...state,
			itemDetails: {} as IItem,
			modalIsOpen: false,
		})
	};

	const openModalIngredient = (id: string) => {
		const item = props.data.find(item => item._id === id) || {} as IItem;

		setState({
			...state,
			itemDetails: item,
			modalIsOpen: true,
		});
	};

	React.useEffect(() => {
		const title = document.getElementById(activeTab);
		const container = title?.offsetParent;

		if (container && container === tabContentRef.current) {
			tabContentRef.current.scroll(0, title?.offsetTop);
		}
	}, [activeTab])

	return (
		<section className="col-6">
			<TabHeader tabs={ Object.keys(sortedData) }
				activeTab={ activeTab }
				setTab={ setTab }
			/>
			<TabContent ref={ tabContentRef }
				data={ sortedData }
				onClickCard={ openModalIngredient }
			/>
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

TabHeader.propTypes = {
	activeTab: PropTypes.string.isRequired,
	tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
	setTab: PropTypes.func.isRequired,
};

TabContent.propTypes = {
	// TODO: Убрать комментарий. Разобраться в чем ошибка, после прохождения темы Typescript
	// @ts-ignore: Unreachable code error
	data: PropTypes.objectOf(
		PropTypes.arrayOf(itemPropTypes)
	).isRequired,
	onClickCard: PropTypes.func.isRequired,
};

BurgerIngredients.propTypes = {
	data: PropTypes.arrayOf(itemPropTypes).isRequired
};
