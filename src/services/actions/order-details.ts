import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOrderDetailsRequest } from "../../utils/api/order-details";

export const getOrder = createAsyncThunk(
  "order/getOrder",
  getOrderDetailsRequest
);
