import { OrderInFeed } from "./order-in-feed";

export type OrderInFeedWithOwner = OrderInFeed & { owner: string };
