import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendOrderRequest } from "../../utils/api/order";

export const sendOrder = createAsyncThunk("order/sendOrder", sendOrderRequest);
