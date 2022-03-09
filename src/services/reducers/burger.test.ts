import { burgerReducer, burgerInitialState } from './burger';
import * as BurgerActions from '../actions/burger';
import {
	bunMock,
	toppingMock,
	sauceMock,
	uidToppingMock,
	mockOrder1,
} from './mock';

describe('burger reducer', () => {
	it('should return the initial state', () => {
		expect(burgerReducer(undefined, {} as BurgerActions.TBurgerActions))
			.toEqual(burgerInitialState);
	});

	it(`should handle calc total price`, () => {
		const ingredients = [bunMock, toppingMock, sauceMock];
		const state = {
			...burgerInitialState,
			bun: bunMock,
			toppings: [sauceMock, toppingMock],
		};

		expect(burgerReducer(
			state,
			BurgerActions.calcTotalPrice(ingredients)
		))
			.toEqual(
				{
					...state,
					totalPrice: bunMock.price * 2 + sauceMock.price + toppingMock.price,
				}
			);
	});

	it(`should handle add bun`, () => {
		expect(burgerReducer(undefined, BurgerActions.addBunAction(bunMock)))
			.toEqual(
				{
					...burgerInitialState,
					bun: bunMock,
				}
			);
	});

	it(`should handle add topping`, () => {
		expect(burgerReducer(undefined, BurgerActions.addToppingAction(toppingMock, uidToppingMock)))
			.toEqual(
				{
					...burgerInitialState,
					toppings: [toppingMock],
				}
			);
	});

	it(`should handle remove topping`, () => {
		expect(burgerReducer(
				{
					...burgerInitialState,
					toppings: [sauceMock, toppingMock],
				},
				BurgerActions.removeIngredientAction(uidToppingMock)
			)
		).toEqual({
			...burgerInitialState,
			toppings: [sauceMock],
		});
	});

	it(`should handle move topping`, () => {
		expect(burgerReducer(
				{
					...burgerInitialState,
					toppings: [sauceMock, toppingMock],
				},
				BurgerActions.moveIngredientAction(0, 1)
			)
		).toEqual({
			...burgerInitialState,
			toppings: [toppingMock, sauceMock],
		});
	});

	it(`should handle clear constructor`, () => {
		expect(burgerReducer(
				{
					...burgerInitialState,
					bun: bunMock,
					toppings: [sauceMock, toppingMock],
				},
				BurgerActions.clearConstructorAction()
			)
		).toEqual(burgerInitialState);
	});

	it(`should handle create order request`, () => {
		const state = {
			...burgerInitialState,
			bun: bunMock,
			toppings: [sauceMock, toppingMock],
		};
		expect(burgerReducer(
				state,
				BurgerActions.createOrderRequestAction()
			)
		).toEqual({
			...state,
			order: {
				...state.order,
				isRequested: true,
				hasError: false,
				success: false,
			}
		});
	});

	it(`should handle create order success`, () => {
		const state = {
			...burgerInitialState,
			bun: bunMock,
			toppings: [sauceMock, toppingMock],
		};
		const { name, number } = mockOrder1;

		expect(burgerReducer(
				state,
				BurgerActions.createOrderSuccessAction(name, number)
			)
		).toEqual({
			...state,
			order: {
				...state.order,
				number,
				name,
				success: true,
				isRequested: false,
				hasError: false,
			}
		});
	});

	it(`should handle create order failed`, () => {
		const state = {
			...burgerInitialState,
			bun: bunMock,
			toppings: [sauceMock, toppingMock],
		};

		expect(burgerReducer(
				state,
				BurgerActions.createOrderFailedAction()
			)
		).toEqual({
			...state,
			order: {
				...state.order,
				success: false,
				isRequested: false,
				hasError: true,
			}
		});
	});
});
