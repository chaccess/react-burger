import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getIngredients } from '../actions/ingredients';
import { IngredientWithCount } from '../../types/application-types/ingredient-with-count';

export type IngredientsState = {
	loading: boolean;
	success: boolean | null;
	ingredients: IngredientWithCount[];
};
const initialState: IngredientsState = {
	loading: false,
	success: null,
	ingredients: [],
};

export const ingredients = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {
		removeBun: (state: IngredientsState, action: PayloadAction<string>) => ({
			...state,
			ingredients: state.ingredients.map(({ ingredient, count }) => {
				if (ingredient._id === action.payload) {
					return {
						count: 0,
						ingredient,
					};
				}
				return { ingredient, count };
			}),
		}),
		setBun: (state: IngredientsState, action: PayloadAction<string>) => ({
			...state,
			ingredients: state.ingredients.map(({ ingredient, count }) => {
				if (ingredient._id === action.payload) {
					return {
						count: 2,
						ingredient,
					};
				}
				return { ingredient, count };
			}),
		}),
		increaseItem: (state: IngredientsState, action: PayloadAction<string>) => ({
			...state,
			ingredients: state.ingredients.map(({ ingredient, count }) => {
				if (ingredient._id === action.payload) {
					return {
						count: count + 1,
						ingredient,
					};
				}
				return { ingredient, count };
			}),
		}),
		decreaseItem: (state: IngredientsState, action: PayloadAction<string>) => ({
			...state,
			ingredients: state.ingredients.map(({ ingredient, count }) => {
				if (ingredient._id === action.payload) {
					return {
						count: count - 1,
						ingredient,
					};
				}
				return { ingredient, count };
			}),
		}),
	},
	extraReducers: (builder) => {
		builder
			.addCase(getIngredients.pending, (state) => {
				state.loading = true;
			})
			.addCase(getIngredients.rejected, (state) => {
				state.loading = false;
				state.success = false;
				state.ingredients = [];
			})
			.addCase(getIngredients.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.ingredients = action.payload.map((ingredient) => ({
					count: 0,
					ingredient,
				}));
			});
	},
});

export const { decreaseItem, increaseItem, removeBun, setBun } =
	ingredients.actions;
