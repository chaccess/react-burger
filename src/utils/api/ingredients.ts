import { baseUrl, ingredients } from "../../config";
import { DataFromServerResponse } from "../../types/responses/data-from-server-response";
import { request } from "../common";

export const getIngredients = () => {
  return request<DataFromServerResponse>(`${baseUrl}${ingredients}`);
};
