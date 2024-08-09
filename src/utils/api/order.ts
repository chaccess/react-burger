import { accessToken, baseUrl, orders } from "../../config";
import { OrderResponse } from "../../types/responses/order-response";
import { request } from "../common";

export const sendOrderRequest = (ids: string[]): Promise<OrderResponse> => {
  const body = {
    ingredients: ids,
  };
  return request<OrderResponse>(`${baseUrl}${orders}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem(accessToken) || "",
    },
    body: body,
  });
};
