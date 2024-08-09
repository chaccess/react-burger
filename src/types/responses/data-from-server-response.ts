export interface IIngredientFromServer {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	price: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	image: string;
	image_large: string;
	image_mobile: string;
}

export type DataFromServerResponse = {
	success: boolean;
	data: IIngredientFromServer[];
	message?: string;
};
