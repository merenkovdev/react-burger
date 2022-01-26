import styles from './burger-ingredients.module.css';

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from "react-router-dom";
import { itemPropTypes } from '../../utils/types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { DraggableIngredient } from '../ingredient/ingredient';

import { throttle } from '../../utils/utils';

import {
	SORT_INGREDIENTS,
	SET_ACTIVE_TAB,
} from '../../services/actions/ingredients';

const tabNames = {
	bun: 'Булки',
	sauce: 'Соусы',
	main: 'Начинки',
};

const TabHeader = React.memo((props) => {
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
});

const TabContent = React.memo(React.forwardRef((props, ref) => {
	let location = useLocation();
	const addedIngredients = useSelector(store => store.ingredients.addedIngredients);
	const {
		titlesRef,
		ingredients,
		handlerScroll,
	} = props;

	return (
		<div ref={ ref }
			className={ cn('mt-10 custom-scroll', styles.tabsContainer) }
			onScroll={ handlerScroll }
		>
			{ Object.keys(ingredients)
				.map((type, index) => (
					<React.Fragment key={ type }>
						<h2 className="text text_type_main-medium pb-6"
							id={ type }
							ref={ node => titlesRef.current[index] = node }
						>
							{ tabNames[type] }
						</h2>
						<ul className={ cn(styles.ingredients, ' pb-10') }>
							{ ingredients[type].map(item => (
								<li className={ cn(styles.ingredient, 'p-3') } key={ item._id }>
									 <Link
										key={item._id}
										to={{
											pathname: `/ingredients/${item._id}`,
											state: { background: location }
										}}
									>
										<DraggableIngredient item={ item }
											count={ addedIngredients[item._id] ?
												Number(addedIngredients[item._id].count) : 0
											}
										/>
									</Link>
								</li>
							)) }
						</ul>
					</React.Fragment>
				))
			}
		</div>
	);
}));

const BurgerIngredients = () => {
	const tabContentRef = React.useRef(null);
	const titlesRef = React.useRef([]);

	const {
		hasError: hasErrorIngredients,
		isRequested: ingredientsRequest,
		sortedItems: sortedIngredients,
		activeTab,
	} = useSelector(store => store.ingredients);
	const dispatch = useDispatch();


	const setTab = (tab) => {
		const title = titlesRef.current.find(elem => elem.id === tab);

		title?.scrollIntoView({ behavior: 'smooth' })
	};

	const trottledHandlerScroll = throttle(() => {
		const titles = titlesRef.current;

		if (!titles.length) {
			return;
		}

		const container = tabContentRef.current;

		const titleOffsets = titles.reduce((acum, current) => {
			acum[Math.abs(current.offsetTop - container.scrollTop)] = current.id;
			return acum;
		}, {});

		const minDistance = Math.min(...Object.keys(titleOffsets));
		const active = titleOffsets[minDistance];

		if (active !== activeTab) {
			dispatch({ type: SET_ACTIVE_TAB, tab: active });
		}
	}, 50);

	const handlerScrollContainer = React.useCallback(
		trottledHandlerScroll,
		[ trottledHandlerScroll ]
	);

	React.useEffect(() => {
		dispatch({ type: SORT_INGREDIENTS });
	}, [ dispatch ]);

	if (ingredientsRequest) {
		return (
			<p className="text text_type_main-large p-10">
				Загрузка...
			</p>
		);
	}

	if (hasErrorIngredients) {
		return (
			<p className="text text_type_main-large p-10">
				Ошибка при получнии ингредиентов...
			</p>
		);
	}

	if (!Object.keys(sortedIngredients)?.length) {
		return null;
	}

	return (
		<section className="col-6">
			<TabHeader tabs={ Object.keys(sortedIngredients) }
				activeTab={ activeTab }
				setTab={ setTab }
			/>
			<TabContent ref={ tabContentRef }
				titlesRef={ titlesRef }
				ingredients={ sortedIngredients }
				handlerScroll={ handlerScrollContainer }
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
	ingredients: PropTypes.objectOf(
		PropTypes.arrayOf(
			PropTypes.shape(itemPropTypes)
		)
	).isRequired,
	titlesRef: PropTypes.shape({
		current: PropTypes.arrayOf(
			PropTypes.instanceOf(Element)
		),
	}),
	handlerScroll: PropTypes.func,
};
