import { accessToken, baseUrl, login, refreshToken } from '../../config';
import { LoginRequest } from '../../types/requests/login-request';
import { LoginResponse } from '../../types/responses/login-response';
import { request } from '../common';

export const sendLoginRequest = async (
	loginRequest: LoginRequest
): Promise<LoginResponse> => {
	try {
		const res = await request<LoginResponse>(`${baseUrl}${login}`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: loginRequest,
		});
		localStorage.setItem(accessToken, res.accessToken);
		localStorage.setItem(refreshToken, res.refreshToken);
		return res;
	} catch (e) {
		localStorage.removeItem(accessToken);
		localStorage.removeItem(refreshToken);
		throw e;
	}
};
