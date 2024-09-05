import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IIngredient } from '../../types/application-types/ingredient';
import { IngredientWithUniqId } from '../../types/application-types/ingredient-with-uniq-id';

export type ConstructorIngredientsState = {
	bun: IIngredient | null;
	ingredients: IngredientWithUniqId[];
};
export const initialState: ConstructorIngredientsState = {
	bun: null,
	ingredients: [],
};
const constructorIngredients = createSlice({
	name: 'constructor-ingredients',
	initialState: initialState,
	reducers: {
		addIngredient: (
			state: ConstructorIngredientsState,
			action: PayloadAction<IngredientWithUniqId>
		) => ({
			...state,
			ingredients: [...state.ingredients, action.payload],
		}),
		removeIngredient: (
			state: ConstructorIngredientsState,
			action: PayloadAction<string>
		) => ({
			...state,
			ingredients: state.ingredients.filter(
				({ uniqId }) => uniqId !== action.payload
			),
		}),
		changeOrder: (
			state: ConstructorIngredientsState,
			action: PayloadAction<{
				fromIndex: number;
				toIndex: number;
			}>
		) => {
			const { fromIndex, toIndex } = action.payload;
			const ingredients = [...state.ingredients];
			ingredients.splice(toIndex, 0, ingredients.splice(fromIndex, 1)[0]);
			return {
				...state,
				ingredients,
			};
		},
		setBun: (
			state: ConstructorIngredientsState,
			action: PayloadAction<IIngredient>
		) => ({
			...state,
			bun: action.payload,
		}),
		clear: () => initialState,
	},
});
export const { addIngredient, setBun, removeIngredient, changeOrder, clear } =
	constructorIngredients.actions;
export { constructorIngredients };
