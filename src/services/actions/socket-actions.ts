import { createAction } from '@reduxjs/toolkit';
import { OrdersFeedState } from '../../types/application-types/orders-feed-state';
export type PayloadType = object | string | number | undefined;

export const socketStart = createAction('socket/start', (url: string) => ({
	payload: url,
}));
export const socketOpen = createAction('socket/open');
export const socketClosed = createAction('socket/closed');
export const socketDisconnect = createAction('socket/disconnect');
export const socketSend = createAction(
	'socket/send',
	(payload: PayloadType) => ({ payload })
);
export const socketError = createAction('socket/error', (message: string) => ({
	payload: message,
}));
export const socketMessage = createAction(
	'socket/message',
	(payload: OrdersFeedState) => ({
		payload,
	})
);

export const socketPrivateStart = createAction(
	'socket/private/start',
	(url: string) => ({
		payload: url,
	})
);
export const socketPrivateOpen = createAction('socket/private/open');
export const socketPrivateClosed = createAction('socket/private/closed');
export const socketPrivateDisconnect = createAction(
	'socket/private/disconnect'
);
export const socketPrivateSend = createAction(
	'socket/private/send',
	(payload: PayloadType) => ({ payload })
);
export const socketPrivateError = createAction(
	'socket/private/error',
	(message: string) => ({
		payload: message,
	})
);
export const socketPrivateMessage = createAction(
	'socket/private/message',
	(payload: OrdersFeedState) => ({
		payload,
	})
);
