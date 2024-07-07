import { baseUrl, orders } from "../../config";
import { Order } from "../../types/order";
import { request } from "../../utils/common";

export const sendOrderRequest = (ids: string[]) => {
  const body = {
    ingredients: ids,
  };
  return request<Order>(`${baseUrl}${orders}`, {
    method: "POST",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify(body),
  });
};
