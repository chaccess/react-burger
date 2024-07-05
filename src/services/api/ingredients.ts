import { baseUrl, ingredients } from "../../config";
import DataFromServer from "../../types/dataFromServer";
import { request } from "../../utils/common";

export const getIngredients = () => {
  return request<DataFromServer>(`${baseUrl}${ingredients}`);
};
