import { accessToken, baseUrl, refreshToken, register } from '../../config';
import { RegisterResponse } from '../../types/responses/register-response';

import { RegisterRequest } from '../../types/requests/register-request';
import { request } from '../common';

export const sendRegisterRequest = async (
	registerRequest: RegisterRequest
): Promise<RegisterResponse> => {
	try {
		const res = await request<RegisterResponse>(`${baseUrl}${register}`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: registerRequest,
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
