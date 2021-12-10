import styles from './app.module.css';

import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import cn from 'classnames';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {
	const [ state, setState ] = React.useState({
		isLoading: false,
		hasError: false,
		data: [],
	});

	const getIngredients = () => {
		setState(prevState => ({
			...prevState,
			isLoaded: true,
			hasError: false,
		}));

		fetch(API_URL)
			.then(response => response.json())
			.then(response => {
				setState((prevState) => ({
					...prevState,
					isLoaded: false,
					data: response.data,
				}));
			})
			.catch(err => {
				console.warm(err);
				setState(prevState => ({
					...prevState,
					isLoaded: false,
					hasError: true
				}));
			});
	};

	React.useEffect(getIngredients, []);

	const {
		isLoading,
		hasError,
		data,
	} = state;

	return (
		<div className={ styles.layout }>
			<AppHeader />
			{ isLoading &&
				<p className="text text_type_main-large p-10">
					Загрузка...
				</p>
			}
			{ hasError &&
				<p className="text text_type_main-large p-10">
			 		Произошла ошибка
		 		</p>
			}
			{ !isLoading &&
				!hasError &&
				Boolean(data.length) &&
				<main className={ cn(styles.main, 'container pl-5 pr-5') }>
					<h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
					<div className="row">
						<BurgerIngredients data={ data } />
						<BurgerConstructor data={ data } />
					</div>
				</main>
			}
		</div>
	)
};

export default App;
