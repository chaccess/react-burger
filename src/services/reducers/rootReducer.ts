//import ingredients from './ingredients';
import { ingredients } from './ingredients';
import { constructorIngredients } from './constructor-ingredients';
import { order } from './order';
import { combineReducers } from 'redux';
import { user } from './user';

export const rootReducer = combineReducers({
	[ingredients.reducerPath]: ingredients.reducer,
	[constructorIngredients.reducerPath]: constructorIngredients.reducer,
	[order.reducerPath]: order.reducer,
	[user.reducerPath]: user.reducer,
});
