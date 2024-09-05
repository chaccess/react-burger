import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/application-types/user";
import { login } from "../actions/login";
import { logout } from "../actions/logout";
import { passwordReset } from "../actions/password-reset";
import { RequestState } from "../../types/application-types/request-state";
import { changeUserInfo } from "../actions/change-user-info";
import { changePassword } from "../actions/change-password";
import { register } from "../actions/register";
import { getUser } from "../actions/user";

export type UserState = {
  user: User | null;
  state: RequestState;
  errorMessage: string;
  successMessage: string;
  changeUserInfoState: RequestState;
  passwordResetState: RequestState;
  changePasswordState: RequestState;
  registerState: RequestState;
};

export const initialState: UserState = {
  user: null,
  state: "init",
  errorMessage: "",
  successMessage: "",
  changeUserInfoState: "init",
  passwordResetState: "init",
  changePasswordState: "init",
  registerState: "init",
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    reset: (state) => {
      state.state = "init";
    },
    resetMessages: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.user = null;
        state.state = "pending";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.state = "success";
      })
      .addCase(login.rejected, (state) => {
        state.user = null;
        state.state = "error";
        state.errorMessage = "Неверный логин/пароль";
      })
      .addCase(logout.pending, (state) => {
        state.state = "pending";
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.state = "success";
      })
      .addCase(logout.rejected, (state) => {
        state.state = "error";
        state.errorMessage = "Выйти не удалось";
      })
      .addCase(changeUserInfo.pending, (state) => {
        state.state = "pending";
      })
      .addCase(changeUserInfo.rejected, (state) => {
        state.state = "error";
        state.errorMessage = "Не удалось поменять данные пользователя";
      })
      .addCase(changeUserInfo.fulfilled, (state, action) => {
        state.state = "success";
        state.user = action.payload;
        state.successMessage = "Данные пользователя изменены";
      })
      .addCase(changePassword.pending, (state) => {
        state.changePasswordState = "pending";
      })
      .addCase(changePassword.rejected, (state) => {
        state.changePasswordState = "error";
        state.errorMessage = "Не удалось поменять пароль";
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.changePasswordState = "success";
        state.successMessage = "Пароль изменён";
      })
      .addCase(passwordReset.pending, (state) => {
        state.passwordResetState = "pending";
      })
      .addCase(passwordReset.rejected, (state) => {
        state.passwordResetState = "error";
        state.errorMessage = "Не удалось поменять пароль";
      })
      .addCase(passwordReset.fulfilled, (state) => {
        state.passwordResetState = "success";
        state.successMessage = "Письмо отправлено";
      })
      .addCase(register.pending, (state) => {
        state.registerState = "pending";
      })
      .addCase(register.rejected, (state) => {
        state.registerState = "error";
        state.errorMessage = "Не удалось зарегистрироаться";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.registerState = "success";
        state.user = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.state = "pending";
        state.user = null;
      })
      .addCase(getUser.rejected, (state) => {
        state.state = "error";
        state.user = null;
        state.errorMessage = "Не удалось получить данные пользователя";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.state = "success";
        state.user = action.payload;
      });
  },
});

export const { setUser, reset, resetMessages } = user.actions;
