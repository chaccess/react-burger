import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IIngredient } from "../../types/ingredient";
import { IngredientWithUniqId } from "../../types/ingredientWithUniqId";

type ConstructorIngredientsType = {
  bun: IIngredient | null;
  ingredients: IngredientWithUniqId[];
};
const initialState: ConstructorIngredientsType = {
  bun: null,
  ingredients: [],
};
const constructorIngredients = createSlice({
  name: "constructor-ingredients",
  initialState: initialState,
  reducers: {
    addIngredient: (
      state: ConstructorIngredientsType,
      action: PayloadAction<IngredientWithUniqId>
    ) => ({
      ...state,
      ingredients: [...state.ingredients, action.payload],
    }),
    removeIngredient: (
      state: ConstructorIngredientsType,
      action: PayloadAction<string>
    ) => ({
      ...state,
      ingredients: state.ingredients.filter(
        ({ uniqId }) => uniqId !== action.payload
      ),
    }),
    changeOrder: (
      state: ConstructorIngredientsType,
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
      state: ConstructorIngredientsType,
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
