import { baseUrl, orders } from "../../config";
import { OrderDetailsResponse } from "../../types/responses/order-details-response";
import { request } from "../common";

export const getOrderDetailsRequest = (
  number: number
): Promise<OrderDetailsResponse> => {
  return request<OrderDetailsResponse>(`${baseUrl}${orders}/${number}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
};
