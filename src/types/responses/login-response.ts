import { User } from '../application-types/user';

export type LoginResponse = {
	success: true;
	accessToken: string;
	refreshToken: string;
	user: User;
	message?: string;
};
