import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getOrder } from "../actions/order-details";
import { OrderDetailsResponse } from "../../types/responses/order-details-response";

export type OrderDetailsState = {
  loading: boolean;
  success: boolean | null;
  order: OrderDetailsResponse | null;
};

const initialState: OrderDetailsState = {
  loading: false,
  success: null,
  order: null,
};

export const orderDetails = createSlice({
  name: "order-details",
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state: OrderDetailsState) => {
        state.loading = true;
      })
      .addCase(getOrder.rejected, (state: OrderDetailsState) => {
        state.loading = false;
        state.success = false;
        state.order = null;
      })
      .addCase(
        getOrder.fulfilled,
        (
          state: OrderDetailsState,
          action: PayloadAction<OrderDetailsResponse>
        ) => {
          state.loading = false;
          state.success = action.payload.success;
          state.order = action.payload;
        }
      );
  },
});

export const { resetState } = orderDetails.actions;
