import { OrderInFeed } from '../application-types/order-in-feed';

export type OrderDetailsResponse = {
	success: true;
	orders: (OrderInFeed & { owner: string })[];
	message?: string;
};
