//import ingredients from './ingredients';
import { ingredients } from "./ingredients";
import { constructorIngredients } from "./constructor-ingredients";
import { order } from "./order";
import { currentIngredient } from "./current-ingredient";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  [ingredients.reducerPath]: ingredients.reducer,
  [constructorIngredients.reducerPath]: constructorIngredients.reducer,
  [currentIngredient.reducerPath]: currentIngredient.reducer,
  [order.reducerPath]: order.reducer,
});
