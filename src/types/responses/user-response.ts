import { User } from '../application-types/user';

export type UserResponse = {
	success: true;
	user: User;
	message?: string;
};
