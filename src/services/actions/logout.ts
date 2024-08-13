import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendLogoutRequest } from '../../utils/api/logout';

export const logout = createAsyncThunk('user/logout', sendLogoutRequest);
