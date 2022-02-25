import { MAX_IDS_ORDER } from './../../utils/constants';
import { TOrder } from './../../types/api';
import { TItem } from '../../types/api';
import { OrderStatus } from '../../types/api';
import { NUMBER_BUNS_IN_BURGERS } from '../../utils/constants';

const getTotalPrice = (ingredients: TItem[]) => {
	return ingredients.reduce(
		(sum, ingredient) => {
			const multiplier = ingredient.type === 'bun' ? NUMBER_BUNS_IN_BURGERS : 1
			return sum + ingredient.price * multiplier;
		}, 0
	);
};

const getIdsWithStatus = (orders: TOrder[]) => {
	const ids = orders.reduce((result: {
		done: Array<number>,
		inwork: Array<number>,
	}, order) => {
		switch (order.status) {
			case OrderStatus.done:
				result.done.push(order.number);

				break;

			case OrderStatus.created:
			case OrderStatus.pending:
				result.inwork.push(order.number);
				break;

			default:
				break;
		}

		return result;
	}, {
			done: [],
			inwork: [],
	});

	return {
		done: ids.done.slice(0, MAX_IDS_ORDER),
		inwork: ids.inwork.slice(0, MAX_IDS_ORDER),
	};
};

const groupIngredients = (ingredients: TItem[]) =>
	ingredients.reduce((
		acum: {
			[name: string]: {
				ingredient: TItem;
				count: number;
			}
		}, ingredient: TItem
	) => {
		if (acum[ingredient._id]) {
			acum[ingredient._id].count += 1;
			return acum;
		}

		acum[ingredient._id] = {
			ingredient,
			count: 1,
		};
		return acum;
	}, {});

export {
	getTotalPrice,
	getIdsWithStatus,
	groupIngredients,
};
