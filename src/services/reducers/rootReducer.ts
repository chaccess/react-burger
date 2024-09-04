import { ingredients } from "./ingredients";
import { constructorIngredients } from "./constructor-ingredients";
import { order } from "./order";
import { combineReducers } from "redux";
import { user } from "./user";
import { orderDetails } from "./order-details";
import { feedReducer } from "./feed-reducer";
import { privateFeedReducer } from "./private-feed-reducer";

export const rootReducer = combineReducers({
  [ingredients.reducerPath]: ingredients.reducer,
  [constructorIngredients.reducerPath]: constructorIngredients.reducer,
  [order.reducerPath]: order.reducer,
  [user.reducerPath]: user.reducer,
  [orderDetails.reducerPath]: orderDetails.reducer,
  feed: feedReducer,
  privateFeed: privateFeedReducer,
});
