import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendChangePasswordRequest } from "../../utils/api/change-password";

export const changePassword = createAsyncThunk(
  "user/changePassword",
  sendChangePasswordRequest
);
