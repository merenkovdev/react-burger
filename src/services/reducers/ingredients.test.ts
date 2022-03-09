import { ingredientsReducer, ingredientsInitialState } from './ingredients';
import * as IngredientsActions from '../actions/ingredients';
import {
	bunMock,
	toppingMock,
	sauceMock,
	sortedItems,
 } from './mock';

const items = [bunMock, toppingMock, sauceMock];

describe('ingredients reducer', () => {
	it('should return the initial state', () => {
		expect(ingredientsReducer(undefined, {} as IngredientsActions.TIngredientsActions))
			.toEqual(ingredientsInitialState);
	});

	it(`should handle ingredient request`, () => {
		expect(ingredientsReducer(undefined,
			IngredientsActions.getIngredientsRequestAction()
		)).toEqual({
			...ingredientsInitialState,
			isRequested: true,
			hasError: false,
		});
	});

	it(`should handle ingredient request success`, () => {
		expect(ingredientsReducer(undefined,
			IngredientsActions.getIngredientsSuccessAction(items)
		)).toEqual({
			...ingredientsInitialState,
			items,
			isRequested: false,
			hasError: false,
		});
	});

	it(`should handle ingredient request failed`, () => {
		expect(ingredientsReducer(
			{
				...ingredientsInitialState,
				isRequested: true,
			},
			IngredientsActions.getIngredientsFailedAction()
		)).toEqual({
			...ingredientsInitialState,
			isRequested: false,
			hasError: true,
		});
	});

	it(`should handle sort ingredients`, () => {
		expect(ingredientsReducer(
			{
				...ingredientsInitialState,
				items,
			},
			IngredientsActions.sortIngredientsAction()
		)).toEqual({
			...ingredientsInitialState,
			items,
			sortedItems,
		});
	});

	it(`should handle set active tab`, () => {
		const tab = 'sauce';

		expect(ingredientsReducer({
			...ingredientsInitialState,
			activeTab: 'main',
		},
			IngredientsActions.setActiveTabAction(tab)
		)).toEqual({
			...ingredientsInitialState,
			activeTab: tab,
		});
	});

	it(`should handle increase added ingredient`, () => {
		expect(ingredientsReducer(
			ingredientsInitialState,
			IngredientsActions.increaseAddedIngredientAction(sauceMock)
		)).toEqual({
			...ingredientsInitialState,
			addedIngredients: {
				[sauceMock._id]: {
					type: sauceMock.type,
					count: 1,
				},
			}
		});
	});

	it(`should handle decrease added ingredient`, () => {
		expect(ingredientsReducer({
				...ingredientsInitialState,
				addedIngredients: {
					[sauceMock._id]: {
						type: sauceMock.type,
						count: 2,
					},
				}
			},
			IngredientsActions.decreaseAddedIngredientAction(sauceMock)
		)).toEqual({
			...ingredientsInitialState,
			addedIngredients: {
				[sauceMock._id]: {
					type: sauceMock.type,
					count: 1,
				},
			}
		});
	});

	it(`should handle clear added ingredient`, () => {
		expect(ingredientsReducer(
			{
				...ingredientsInitialState,
				addedIngredients: {
					[sauceMock._id]: {
						type: sauceMock.type,
						count: 1,
					},
					[bunMock._id]: {
						type: bunMock.type,
						count: 2,
					},
				}
			},
			IngredientsActions.clearAddedIngredientAction()
		)).toEqual(ingredientsInitialState);
	});
});
