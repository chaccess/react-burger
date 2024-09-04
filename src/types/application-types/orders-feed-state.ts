import { OrderInFeed } from "./order-in-feed";

export type OrdersFeedState = {
  orders: OrderInFeed[];
  total: number;
  totalToday: number;
  state: "init" | "loaded" | "open" | "error";
  errorMessage: string;
};
