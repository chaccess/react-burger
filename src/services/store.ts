import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers/rootReducer';
import { IngredientsState, ingredients } from './reducers/ingredients';
import {
	ConstructorIngredientsState,
	constructorIngredients,
} from './reducers/constructor-ingredients';
import { OrderState, order } from './reducers/order';
import { user, UserState } from './reducers/user';

export const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
});

export type AppState = {
	[ingredients.reducerPath]: IngredientsState;
	[constructorIngredients.reducerPath]: ConstructorIngredientsState;
	[order.reducerPath]: OrderState;
	[user.reducerPath]: UserState;
};

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
