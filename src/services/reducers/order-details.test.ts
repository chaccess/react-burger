import { configureStore } from "@reduxjs/toolkit";
import { orderDetails, OrderDetailsState } from "./order-details";
import { rootReducer } from "./rootReducer";
import { getOrder } from "../actions/order-details";
import { AppState } from "../store";
import { initialState } from "./order-details";
import axios from "axios";
import { OrderInFeedWithOwner } from "../../types/application-types/order-in-feed-with-owner";
jest.mock("axios");
const reducer = orderDetails.reducer;
const order: OrderInFeedWithOwner = {
	_id: "6693e366119d45001b4f8d3d",
	ingredients: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa093c"],
	owner: "6657b24597ede0001d06d2f0",
	status: "done",
	name: "Краторный бургер",
	createdAt: "2024-07-14T14:40:38.339Z",
	updatedAt: "2024-07-14T14:40:38.722Z",
	number: 45769,
};

describe("order-reducer tests", () => {
	let store: ReturnType<typeof configureStore<AppState>>;
	let appInitialState: AppState;
	beforeEach(() => {
		store = configureStore({ reducer: rootReducer });
		appInitialState = store.getState();
	});

	it("Test of initial state", () => {
		//act
		const state = reducer(undefined, { type: "" });
		//assert
		expect(state).toStrictEqual(initialState);
	});

	it("getOrder.pending should set the loading property to true", () => {
		//act
		const state = reducer(initialState, { type: getOrder.pending.type });
		expect(state).toStrictEqual({
			...initialState,
			loading: true,
		});
	});

	it("getOrder.rejected should set the loading and success properties to false, the order property to null", () => {
		//arrange
		const initialStateWithOrder: OrderDetailsState = {
			...initialState,
			order: order,
		};

		//act
		const state = reducer(initialStateWithOrder, {
			type: getOrder.rejected.type,
		});
		expect(state).toStrictEqual({
			...initialStateWithOrder,
			loading: false,
			success: false,
			order: null,
		});
	});

	it("getOrder.fulfilled should set the loading to false, the success to true, fill the order property", () => {
		//arrange
		const initialStatePending: OrderDetailsState = {
			loading: true,
			success: false,
			order: null,
		};

		//act
		const state = reducer(initialStatePending, {
			type: getOrder.fulfilled.type,
			payload: {
				orders: [order],
			},
		});
		expect(state).toStrictEqual({
			...initialStatePending,
			loading: false,
			success: true,
			order,
		});
	});

	it("getOrder.fulfilled with empty list should set the loading to false, the success to false, the order property to null", () => {
		//arrange
		const initialStateWithOrderSuccessFalse: OrderDetailsState = {
			...initialState,
			success: false,
			order: order,
		};

		//act
		const state = reducer(initialStateWithOrderSuccessFalse, {
			type: getOrder.fulfilled.type,
			payload: {
				orders: [],
			},
		});
		expect(state).toStrictEqual({
			...initialStateWithOrderSuccessFalse,
			order: null,
		});
	});

	it("getOrder: status 200 OK should add order", async () => {
		(axios.get as jest.Mock).mockImplementationOnce(() => {
			return Promise.resolve({
				status: 200,
				statusText: "200 OK",
				data: {
					success: true,
					orders: [order],
				},
			});
		});

		await store.dispatch(getOrder(45626));

		expect(store.getState()).toStrictEqual({
			...appInitialState,
			"order-details": {
				loading: false,
				success: true,
				order: order,
			},
		} as AppState);
	});

	it("getOrder: status 200 OK, but data is empty, should set error", async () => {
		(axios.get as jest.Mock).mockImplementationOnce(() => {
			return Promise.resolve({
				status: 200,
				statusText: "200 OK",
				data: {
					success: true,
					orders: [],
				},
			});
		});

		await store.dispatch(getOrder(45626));

		expect(store.getState()).toStrictEqual({
			...appInitialState,
			"order-details": {
				loading: false,
				success: false,
				order: null,
			},
		} as AppState);
	});

	it("getOrder: status 500 Internal Error should set error", async () => {
		(axios.get as jest.Mock).mockImplementationOnce(() => {
			return Promise.resolve({
				status: 500,
				statusText: "500 Internal Server Errror",
				data: {
					success: true,
					orders: [],
				},
			});
		});

		await store.dispatch(getOrder(45626));

		expect(store.getState()).toStrictEqual({
			...appInitialState,
			"order-details": {
				loading: false,
				success: false,
				order: null,
			},
		} as AppState);
	});
});
