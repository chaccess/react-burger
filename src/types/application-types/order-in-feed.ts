export type OrderInFeed = {
	ingredients: string[];
	_id: string;
	status: OrderStatus;
	number: number;
	createdAt: string;
	updatedAt: string;
	name: string;
};

export type OrderStatus = 'done' | 'created' | 'pending' | 'cancelled';
