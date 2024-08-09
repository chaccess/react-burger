import { User } from '../application-types/user';

export type RegisterResponse = {
	success: true;
	user: User;
	accessToken: string;
	refreshToken: string;
	message?: string;
};
