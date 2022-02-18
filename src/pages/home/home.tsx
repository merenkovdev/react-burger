import { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';

const Home: FC = () => {
	return (
		<>
			<h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
			<div className="row">
				<DndProvider backend={HTML5Backend}>
					<BurgerIngredients />
					<BurgerConstructor />
				</ DndProvider>
			</div>
		</>
	);
};

export default Home;