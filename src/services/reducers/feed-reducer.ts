import { createReducer } from "@reduxjs/toolkit";
import { OrdersFeedState } from "../../types/application-types/orders-feed-state";
import {
  socketClosed,
  socketError,
  socketMessage,
  socketOpen,
} from "../actions/socket-actions";

const initialState: OrdersFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  state: "init",
  errorMessage: "",
};

export const feedReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(socketOpen, (state) => {
      state.state = "open";
    })
    .addCase(socketClosed, (state) => {
      state.state = "init";
    })
    .addCase(socketError, (state, action) => {
      state.state = "error";
      state.errorMessage = action.payload;
    })
    .addCase(socketMessage, (state, action) => {
      const { payload } = action;
      state.orders = payload.orders;
      state.total = payload.total;
      state.totalToday = payload.totalToday;
      state.state = "loaded";
    });
});
