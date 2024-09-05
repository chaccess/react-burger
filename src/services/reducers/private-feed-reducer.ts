import { createReducer } from "@reduxjs/toolkit";
import { OrdersFeedState } from "../../types/application-types/orders-feed-state";
import {
  socketPrivateOpen,
  socketPrivateClosed,
  socketPrivateError,
  socketPrivateMessage,
} from "../actions/socket-actions";

export const initialState: OrdersFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  state: "init",
  errorMessage: "",
};

export const privateFeedReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(socketPrivateOpen, (state) => {
      state.state = "open";
    })
    .addCase(socketPrivateClosed, (state) => {
      state.state = "init";
    })
    .addCase(socketPrivateError, (state, action) => {
      state.state = "error";
      state.errorMessage = action.payload;
    })
    .addCase(socketPrivateMessage, (state, action) => {
      const { payload } = action;
      state.orders = payload.orders;
      state.total = payload.total;
      state.totalToday = payload.totalToday;
      state.state = "loaded";
    });
});
