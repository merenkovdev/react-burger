import styles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import data from '../../utils/data';
import cn from 'classnames';

const App = () => (
	<>
		<AppHeader />
		<main className={ cn(styles.main, 'container pl-5 pr-5') }>
			<h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
			<div className="row">
				<BurgerIngredients data={ data } />
				<BurgerConstructor data={ data } />
			</div>
		</main>
	</>
);

export default App;