import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendOrderRequest } from "../api/order";

export const sendOrder = createAsyncThunk("order/sendOrder", sendOrderRequest);
