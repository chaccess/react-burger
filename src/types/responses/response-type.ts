import { DataFromServerResponse } from './data-from-server-response';
import { LoginResponse } from './login-response';
import { LogoutResponse } from './logout-response';
import { OrderResponse } from './order-response';
import { SimpleResponse } from './simple-response';
import { UserResponse } from './user-response';

export type ApplicationResponse =
	| LoginResponse
	| LogoutResponse
	| SimpleResponse
	| UserResponse
	| OrderResponse
	| DataFromServerResponse;
