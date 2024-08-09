import { IIngredient } from './ingredient';

export interface IngredientWithUniqId {
	ingredient: IIngredient;
	uniqId: string;
}
