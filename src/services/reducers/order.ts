import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { sendOrder } from "../actions/order";
import { OrderResponse } from "../../types/responses/order-response";
export type OrderState = {
  loading: boolean;
  success: boolean | null;
  order: {
    name: string;
    number: number;
  } | null;
};
export const initialState: OrderState = {
  loading: false,
  success: null,
  order: null,
};
export const order = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrder: (state: OrderState) => ({
      ...state,
      order: null,
      success: null,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state: OrderState) => {
        state.loading = true;
      })
      .addCase(sendOrder.rejected, (state: OrderState) => {
        state.loading = false;
        state.success = false;
        state.order = null;
      })
      .addCase(
        sendOrder.fulfilled,
        (state: OrderState, action: PayloadAction<OrderResponse>) => {
          state.loading = false;
          state.success = true;
          state.order = {
            name: action.payload.name,
            number: action.payload.order.number,
          };
        }
      );
  },
});

export const { clearOrder } = order.actions;
