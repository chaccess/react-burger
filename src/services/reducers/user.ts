import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/application-types/user';
import { login } from '../actions/login';
import { logout } from '../actions/logout';
import { passwordReset } from '../actions/password-reset';
import { RequestState } from '../../types/application-types/request-state';
import { changeUserInfo } from '../actions/change-user-info';
import { changePassword } from '../actions/change-password';
import { register } from '../actions/register';
import { getUser } from '../actions/user';

export type UserState = {
	user: User | null;
	state: RequestState;
	errorMessage: string;
};

const initialState: UserState = {
	user: null,
	state: 'init',
	errorMessage: '',
};

export const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User | null>) => {
			state.user = action.payload;
		},
		reset: (state) => {
			state.state = 'init';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.user = null;
				state.state = 'pending';
			})
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload;
				state.state = 'success';
			})
			.addCase(login.rejected, (state) => {
				state.user = null;
				state.state = 'error';
			})
			.addCase(logout.pending, (state) => {
				state.state = 'pending';
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
				state.state = 'init';
			})
			.addCase(logout.rejected, (state) => {
				state.state = 'error';
				state.errorMessage = 'Выйти не удалось';
			})
			.addCase(changeUserInfo.pending, (state) => {
				state.state = 'pending';
			})
			.addCase(changeUserInfo.rejected, (state) => {
				state.state = 'error';
				state.errorMessage = 'Не удалось поменять данные пользователя';
			})
			.addCase(changeUserInfo.fulfilled, (state, action) => {
				state.state = 'success';
				state.user = action.payload;
			})
			.addCase(changePassword.pending, (state) => {
				state.state = 'pending';
			})
			.addCase(changePassword.rejected, (state) => {
				state.state = 'error';
				state.errorMessage = 'Не удалось поменять пароль';
			})
			.addCase(changePassword.fulfilled, (state) => {
				state.state = 'success';
			})
			.addCase(passwordReset.pending, (state) => {
				state.state = 'pending';
			})
			.addCase(passwordReset.rejected, (state) => {
				state.state = 'error';
				state.errorMessage = 'Не удалось поменять пароль';
			})
			.addCase(passwordReset.fulfilled, (state) => {
				state.state = 'success';
			})
			.addCase(register.pending, (state) => {
				state.state = 'pending';
			})
			.addCase(register.rejected, (state) => {
				state.state = 'error';
				state.errorMessage = 'Не удалось зарегистрироаться';
			})
			.addCase(register.fulfilled, (state, action) => {
				state.state = 'success';
				state.user = action.payload;
			})
			.addCase(getUser.pending, (state) => {
				state.state = 'pending';
				state.user = null;
			})
			.addCase(getUser.rejected, (state) => {
				state.state = 'error';
				state.user = null;
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.state = 'success';
				state.user = action.payload;
			});
	},
});

export const { setUser, reset } = user.actions;
