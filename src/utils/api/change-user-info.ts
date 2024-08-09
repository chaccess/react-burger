import { baseUrl, user } from '../../config';
import { ChangeUserInfoRequest } from '../../types/requests/change-user-info-request';
import { UserResponse } from '../../types/responses/user-response';
import { request } from '../common';

export const sendChangeUserInfoRequest = (
	changeUserInfoRequest: ChangeUserInfoRequest
): Promise<UserResponse> => {
	return request<UserResponse>(`${baseUrl}${user}`, {
		method: 'PATCH',
		headers: {
			Authorization: localStorage.getItem('accessToken') as string,
			'Content-Type': 'application/json',
		},
		body: changeUserInfoRequest,
	});
};
