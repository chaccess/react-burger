import { nanoid } from "@reduxjs/toolkit";
import { IIngredient } from "./types/application-types/ingredient";
import { IngredientWithUniqId } from "./types/application-types/ingredient-with-uniq-id";

export const bun: IIngredient = {
	_id: "643d69a5c3f7b9001cfa093c",
	name: "Краторная булка N-200i",
	type: "bun",
	proteins: 80,
	fat: 24,
	carbohydrates: 53,
	calories: 420,
	price: 1255,
	image: "https://code.s3.yandex.net/react/code/bun-02.png",
	imageMobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
	imageLarge: "https://code.s3.yandex.net/react/code/bun-02-large.png",
};

export const ingredient1: IIngredient = {
	_id: "643d69a5c3f7b9001cfa0941",
	name: "Биокотлета из марсианской Магнолии",
	type: "main",
	proteins: 420,
	fat: 142,
	carbohydrates: 242,
	calories: 4242,
	price: 424,
	image: "https://code.s3.yandex.net/react/code/meat-01.png",
	imageMobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
	imageLarge: "https://code.s3.yandex.net/react/code/meat-01-large.png",
};

export const ingredient2: IIngredient = {
	_id: "643d69a5c3f7b9001cfa093e",
	name: "Филе Люминесцентного тетраодонтимформа",
	type: "main",
	proteins: 44,
	fat: 26,
	carbohydrates: 85,
	calories: 643,
	price: 988,
	image: "https://code.s3.yandex.net/react/code/meat-03.png",
	imageMobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
	imageLarge: "https://code.s3.yandex.net/react/code/meat-03-large.png",
};

export const ingredient3: IIngredient = {
	_id: "643d69a5c3f7b9001cfa0942",
	name: "Соус Spicy-X",
	type: "sauce",
	proteins: 30,
	fat: 20,
	carbohydrates: 40,
	calories: 30,
	price: 90,
	image: "https://code.s3.yandex.net/react/code/sauce-02.png",
	imageMobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
	imageLarge: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
};

export const ingredient1WithUniqId: IngredientWithUniqId = {
	uniqId: nanoid(),
	ingredient: ingredient1,
};

export const ingredient2WithUniqId: IngredientWithUniqId = {
	uniqId: nanoid(),
	ingredient: ingredient2,
};

export const ingredient3WithUniqId: IngredientWithUniqId = {
	uniqId: nanoid(),
	ingredient: ingredient3,
};
