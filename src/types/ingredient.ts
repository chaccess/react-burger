import { FillingType } from "./fillingType";

export interface IIngredient {
  _id: string;
  name: string;
  type: FillingType;
  proteins: number;
  price: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  image: string;
  imageLarge: string;
  imageMobile: string;
}
