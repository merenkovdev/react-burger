import styles from './burger-ingredients.module.css';

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { itemPropTypes } from '../../utils/types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { DraggableIngredient } from '../ingredient/ingredient';

import { MODAL_DETAILS } from '../../utils/constants';
import { throttle } from '../../utils/utils';

import {
	SET_INGREDIENTS_DETAILS,
	SORT_INGREDIENTS,
	getIngredients,
	SET_ACTIVE_TAB,
} from '../../services/actions/ingredients';
import { SHOW_MODAL } from '../../services/actions/modal';

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
	const addedIngredients = useSelector(store => store.ingredients.addedIngredients);
	const {
		titlesRef,
		ingredients,
		handlerScroll,
	} = props;

	const dispatch = useDispatch();

	const onClickCard = React.useCallback((id) => {
		dispatch({
			type: SET_INGREDIENTS_DETAILS,
			id,
		});

		dispatch({ type: SHOW_MODAL, name: MODAL_DETAILS });
	}, [ dispatch ]);

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
									<DraggableIngredient item={ item }
										count={ addedIngredients[item._id] ?
											Number(addedIngredients[item._id].count) : 0
										}
										onClickCard={ onClickCard }
									/>
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
		items: ingredients,
		hasError: IngredientsError,
		isRequested: ingredientsRequest,
		sortedItems: sortedIngredients,
		activeTab,
	} = useSelector(store => store.ingredients);
	const dispatch = useDispatch();

	
	const setTab = (tab) => {
		// TODO: Доработать переключение табов
		// dispatch({ type: SET_ACTIVE_TAB, tab });
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
		dispatch(getIngredients());
	}, [ dispatch ]);

	React.useEffect(() => {
		dispatch({ type: SORT_INGREDIENTS });
	}, [ ingredients, dispatch ]);

	// TODO: Доработать переключение табов
	// React.useEffect(() => {
	// 	const title = document.getElementById(activeTab);
	// 	const container = title?.offsetParent;

	// 	if (container && container === tabContentRef.current) {
	// 		tabContentRef.current.scroll(0, title?.offsetTop);
	// 	}
	// }, [ activeTab ]);

	return (
		<section className="col-6">
			{ ingredientsRequest &&
				<p className="text text_type_main-large p-10">
					Загрузка...
				</p>
			}
			{ IngredientsError &&
				<p className="text text_type_main-large p-10">
					Ошибка при получнии ингредиентов...
				</p>
			}
			{ !ingredientsRequest &&
				!IngredientsError &&
				Boolean(ingredients.length) &&
				<>
					<TabHeader tabs={ Object.keys(sortedIngredients) }
						activeTab={ activeTab }
						setTab={ setTab }
					/>
					<TabContent ref={ tabContentRef }
						titlesRef={ titlesRef }
						ingredients={ sortedIngredients }
						handlerScroll={ handlerScrollContainer }
					/>
				</>
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
	ingredients: PropTypes.objectOf(
		PropTypes.arrayOf(
			PropTypes.shape(itemPropTypes)
		)
	).isRequired,
	handlerScroll: PropTypes.func,
};
