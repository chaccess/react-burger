import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { sendOrder } from "../actions/order";
import { Order } from "../../types/order";
type State = {
  loading: boolean;
  success: boolean | null;
  order: Order | null;
};
const initialState: State = {
  loading: false,
  success: null,
  order: null,
};
export const order = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrder: (state: State) => ({
      ...state,
      order: null,
      success: null,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state: State) => {
        state.loading = true;
      })
      .addCase(sendOrder.rejected, (state: State) => {
        state.loading = false;
        state.success = false;
        state.order = null;
      })
      .addCase(
        sendOrder.fulfilled,
        (state: State, action: PayloadAction<Order>) => {
          state.loading = false;
          state.success = action.payload.success;
          state.order = action.payload;
        }
      );
  },
});

export const { clearOrder } = order.actions;
