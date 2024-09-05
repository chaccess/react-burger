import { AppState } from "../store";
import {
	clearCounts,
	decreaseItem,
	increaseItem,
	IngredientsState,
	removeBun,
	setBun,
} from "./ingredients";
import { ingredients } from "./ingredients";
import { rootReducer } from "./rootReducer";

//import type axios from 'axios';
import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import { getIngredients } from "../actions/ingredients";
import { initialState } from "./ingredients";
import { bun, ingredient1, ingredient2 } from "../../constants";
jest.mock("axios");

const reducer = ingredients.reducer;

const initialStateWithBun: IngredientsState = {
	...initialState,
	ingredients: [
		{
			count: 2,
			ingredient: bun,
		},
	],
};

const initialStateWithoutBun: IngredientsState = {
	...initialState,
	ingredients: [
		{
			count: 0,
			ingredient: bun,
		},
	],
};

const initialStateWithCounts: IngredientsState = {
	...initialState,
	ingredients: [
		{
			count: 1,
			ingredient: ingredient1,
		},
		{
			count: 1,
			ingredient: ingredient2,
		},
	],
};

const initialStateWithZeroCounts: IngredientsState = {
	...initialState,
	ingredients: [
		{
			count: 0,
			ingredient: ingredient1,
		},
		{
			count: 0,
			ingredient: ingredient2,
		},
	],
};

//#endregion

describe("Ingredients reducer tests", () => {
	let store: ReturnType<typeof configureStore<AppState>>;
	let appState: AppState;
	beforeEach(() => {
		store = configureStore<AppState>({ reducer: rootReducer });
		appState = store.getState();
	});

	it("Test of initial state", () => {
		//act
		const state = reducer(undefined, { type: "" });
		//assert
		expect(state).toStrictEqual(initialState);
	});

	it("removeBun: it should reset count for a bun", () => {
		//act
		const state = reducer(initialStateWithBun, removeBun(bun._id));

		//assert
		expect(state).toStrictEqual(initialStateWithoutBun);
	});

	it("setBun: it should set count to value of 2 for a bun", () => {
		//arrange
		const initialState: IngredientsState = {
			loading: false,
			success: null,
			ingredients: [
				{
					count: 0,
					ingredient: bun,
				},
			],
		};

		//act
		const state = reducer(initialState, setBun(bun._id));

		//assert
		expect(state).toStrictEqual(initialStateWithBun);
	});

	it("increaseItem: it should increase the count of a ingredient", () => {
		//act
		const state = reducer(
			initialStateWithZeroCounts,
			increaseItem(ingredient1._id),
		);

		//assert
		expect(state).toStrictEqual({
			...initialState,
			ingredients: [
				{
					count: 1,
					ingredient: ingredient1,
				},
				{
					count: 0,
					ingredient: ingredient2,
				},
			],
		});
	});

	it("decreaseItem: it should decrease the count of a ingredient", () => {
		//act
		const state = reducer(
			initialStateWithCounts,
			decreaseItem(ingredient2._id),
		);

		//assert
		expect(state).toStrictEqual({
			...initialStateWithCounts,
			ingredients: [
				{
					count: 1,
					ingredient: ingredient1,
				},
				{
					count: 0,
					ingredient: ingredient2,
				},
			],
		});
	});

	it("clearCounts: it should reset the all counts to zero", () => {
		//act
		const state = reducer(initialStateWithCounts, clearCounts());

		//assert
		expect(state).toStrictEqual(initialStateWithZeroCounts);
	});

	it("getIngredients.pending should set loading to true", () => {
		//act
		const state = reducer(initialState, { type: getIngredients.pending.type });
		//assert
		expect(state).toStrictEqual({
			...initialState,
			loading: true,
		});
	});

	it("getIngredients.rejected should set the loading, success properties to false, and ingredients to empty list", () => {
		//act
		const state = reducer(initialState, { type: getIngredients.rejected.type });
		//assert
		expect(state).toStrictEqual({
			...initialState,
			loading: false,
			success: false,
			ingredients: [],
		});
	});

	it("getIngredients.fulfilled should set the loading property to false, the success property to true, and fill the ingredients", () => {
		//act
		const state = reducer(initialState, {
			type: getIngredients.fulfilled.type,
			payload: [ingredient1],
		});
		//assert
		expect(state).toStrictEqual({
			...initialState,
			loading: false,
			success: true,
			ingredients: [
				{
					count: 0,
					ingredient: ingredient1,
				},
			],
		});
	});

	it("getIngredients: status ok, should add ingredient", async () => {
		//arrange
		const response = [
			{
				...ingredient1,
				image_large: ingredient1.imageLarge,
				image_mobile: ingredient1.imageMobile,
			},
		];

		(axios.get as jest.Mock).mockImplementationOnce(() =>
			Promise.resolve({
				status: 200,
				statusText: "200 OK",
				data: {
					success: true,
					data: response,
				},
			}),
		);

		//act
		await store.dispatch(getIngredients());
		//assert
		expect(store.getState()).toStrictEqual({
			...appState,
			ingredients: {
				loading: false,
				success: true,
				ingredients: [
					{
						count: 0,
						ingredient: ingredient1,
					},
				],
			},
		} as AppState);
	});

	it("getIngredients: status 500, should set error", async () => {
		//arrange
		(axios.get as jest.Mock).mockImplementationOnce(() =>
			Promise.resolve({
				status: 500,
				statusText: "500 Internal Server Error",
				data: {
					success: true,
				},
			}),
		);

		//act
		await store.dispatch(getIngredients());
		//assert
		expect(store.getState()).toStrictEqual({
			...appState,
			ingredients: {
				loading: false,
				success: false,
				ingredients: [],
			},
		} as AppState);
	});
});
