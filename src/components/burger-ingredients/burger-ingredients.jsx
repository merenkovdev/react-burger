import styles from './burger-ingredients.module.css';

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../ingredient/ingredient';
import { itemPropTypes } from '../../utils/types';

import { useSelector, useDispatch } from 'react-redux';
import {
	SET_INGREDIENTS_DETAILS,
	SORT_INGREDIENTS,
	getIngredients,
} from '../../services/actions/ingredients';
import { SHOW_MODAL } from '../../services/actions/modal';
import { MODAL_DETAILS } from '../../utils/constants';

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
	const {
		ingredients,
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
		<div ref={ ref } className={ cn('mt-10 custom-scroll', styles.tabsContainer) }>
			{ Object.keys(ingredients)
				.map(type => (
					<React.Fragment key={ type }>
						<h2 className="text text_type_main-medium pb-6" id={ type }>
							{ tabNames[type] }
						</h2>
						<ul className={ cn(styles.ingredients, ' pb-10') }>
							{ ingredients[type].map(item => (
								<li className={ cn(styles.ingredient, 'p-3') } key={ item._id }>
									<Ingredient item={ item } count={1} onClickCard={ onClickCard } />
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
	const [ activeTab, setTab ] = React.useState('bun');
	const tabContentRef = React.useRef(null);

	const {
		items: ingredients,
		hasError: IngredientsError,
		isRequested: ingredientsRequest,
		sortedItems: sortedIngredients,
	} = useSelector(store => store.ingredients);
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(getIngredients());
	}, [ dispatch ]);

	React.useEffect(() => {
		dispatch({ type: SORT_INGREDIENTS });
	}, [ ingredients, dispatch ]);

	React.useEffect(() => {
		const title = document.getElementById(activeTab);
		const container = title?.offsetParent;

		if (container && container === tabContentRef.current) {
			tabContentRef.current.scroll(0, title?.offsetTop);
		}
	}, [activeTab])

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
						ingredients={ sortedIngredients }
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
};
