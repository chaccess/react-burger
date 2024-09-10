import { OrdersFeedState } from "../../types/application-types/orders-feed-state";
import {
	socketPrivateClosed,
	socketPrivateError,
	socketPrivateMessage,
	socketPrivateOpen,
} from "../actions/socket-actions";
import { initialState, privateFeedReducer } from "./private-feed-reducer";

const stateOpen: OrdersFeedState = {
	...initialState,
	state: "open",
};

describe("private-feed-reducer tests", () => {
	it("Test of initial state", () => {
		//act
		const state = privateFeedReducer(undefined, { type: "" });
		//assert
		expect(state).toStrictEqual(initialState);
	});

	it("socketPrivateOpen: should change state to 'open'", () => {
		//act
		const state = privateFeedReducer(initialState, socketPrivateOpen());

		//assert
		expect(state).toStrictEqual(stateOpen);
	});

	it("socketPrivateClosed: should change state to 'init'", () => {
		//act
		const state = privateFeedReducer(stateOpen, socketPrivateClosed());

		//assert
		expect(state).toStrictEqual(initialState);
	});

	it("socketPrivateError: should change state to 'error' and add error message", () => {
		//act
		const state = privateFeedReducer(
			stateOpen,
			socketPrivateError("error message"),
		);

		//assert
		expect(state).toStrictEqual({
			...stateOpen,
			state: "error",
			errorMessage: "error message",
		});
	});

	it("socketPrivateMessage: should add orders to the orders list and change state to 'loaded'", () => {
		//arrange
		const payload: OrdersFeedState = {
			orders: [
				{
					createdAt: "2024-07-11T20:18:59.131Z",
					ingredients: [
						"643d69a5c3f7b9001cfa093d",
						"643d69a5c3f7b9001cfa093e",
						"643d69a5c3f7b9001cfa093e",
					],
					name: "Флюоресцентный фалленианский люминесцентный метеоритный бургер",
					number: 45501,
					status: "done",
					updatedAt: "2024-07-11T20:18:59.523Z",
					_id: "66903e33119d45001b4f82f0",
				},
			],
			total: 10000,
			totalToday: 10,
			state: "init",
			errorMessage: "",
		};

		//act
		const state = privateFeedReducer(stateOpen, socketPrivateMessage(payload));

		//assert
		expect(state).toStrictEqual({
			...payload,
			state: "loaded",
		});
	});
});
