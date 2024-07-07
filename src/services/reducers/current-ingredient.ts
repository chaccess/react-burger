import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IIngredient } from "../../types/ingredient";
type StateType = IIngredient | null;
const initialState: StateType = null;
export const currentIngredient = createSlice({
  name: "current",
  initialState: initialState as StateType,
  reducers: {
    setCurrentItem: (state: StateType, action: PayloadAction<IIngredient>) =>
      action.payload,
    clearCurrentItem: () => null,
  },
});
export const { setCurrentItem, clearCurrentItem } = currentIngredient.actions;
