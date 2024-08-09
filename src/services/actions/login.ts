import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendLoginRequest } from '../../utils/api/login';
import { LoginRequest } from '../../types/requests/login-request';

export const login = createAsyncThunk(
	'user/login',
	async (loginRequest: LoginRequest) => {
		const res = await sendLoginRequest(loginRequest);
		return res.user;
	}
);
