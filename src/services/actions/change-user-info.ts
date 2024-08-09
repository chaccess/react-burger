import { createAsyncThunk } from "@reduxjs/toolkit";
import { ChangeUserInfoRequest } from "../../types/requests/change-user-info-request";
import { sendChangeUserInfoRequest } from "../../utils/api/change-user-info";
import { User } from "../../types/application-types/user";

export const changeUserInfo = createAsyncThunk<User, ChangeUserInfoRequest>(
  "user/changeUserInfo",
  async (request) => {
    const res = await sendChangeUserInfoRequest(request);
    return res.user;
  }
);
