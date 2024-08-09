export type RefreshTokenResponse = {
	success: true;
	accessToken: string;
	refreshToken: string;
	message?: string;
};
