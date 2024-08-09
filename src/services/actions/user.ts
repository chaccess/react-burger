import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendGetUserRequest } from '../../utils/api/user';
import { User } from '../../types/application-types/user';

export const getUser = createAsyncThunk<User | null, void>(
	'user/getUser',
	async (_) => {
		if (localStorage.getItem('accessToken')) {
			const res = await sendGetUserRequest();
			return res.user;
		} else {
			return null;
		}
	}
);
