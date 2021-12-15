import styles from './burger-ingredients.module.css';

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../ingredient/ingredient';
import ModalContext from '../../services/modal-context';
import DataContext from '../../services/data-context';

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

const tabNames = {
	bun: 'Булки',
	sauce: 'Соусы',
	main: 'Начинки',
};

const TabHeader = (props) => {
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

const TabContent = React.forwardRef((props, ref) => {
	const { dataDispatch } = React.useContext(DataContext);
	const { openModalDetails } = React.useContext(ModalContext);
	const {
		data,
	} = props;

	const onClickCard = React.useCallback((id) => {
		dataDispatch({
			type: 'item-details',
			payload: id,
		});
		openModalDetails();
	}, [ dataDispatch, openModalDetails ]);

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

const BurgerIngredients = () => {
	const { data } = React.useContext(DataContext);
	const [ activeTab, setTab ] = React.useState('bun');
	const tabContentRef = React.useRef(null);

	const sortedData = React.useMemo(() => {
		return data.reduce((acum, current) => {
			if (current.type && !acum[current.type]) {
				acum[current.type] = [];
			}

			if (acum[current.type]) {
				acum[current.type].push(current);
			}

			return acum;
		}, {})
	}, [ data ]);

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
			/>
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
};
