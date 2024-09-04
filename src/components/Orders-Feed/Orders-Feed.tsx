import { useAppSelector } from "../../hooks/redux";
import { sortByDateReversed } from "../../utils/common";
import { OrderCard } from "../Order-Card/Order-Card";
import { RequestStatus } from "../RequestStatus/RequestStatus";
import styles from "./Orders-Feed.module.scss";
import { FC } from "react";

export const OrdersFeed: FC = () => {
  const { orders, state } = useAppSelector((state) => state.feed);

  let ordersSorted = [...orders];
  ordersSorted.sort(sortByDateReversed);

  return (
    <>
      {(state === "init" || state === "error") && (
        <RequestStatus
          state={`${state === "init" ? "pending" : "error"}`}
          errorMessage="Не удалось установить соединение"
        />
      )}
      <section className={`mt-10 ${styles["orders-feed"]}`}>
        <header className={`mb-5 text text_type_main-large`}>
          Лента заказов
        </header>
        <section className={`${styles["cards"]} pr-2`}>
          {ordersSorted.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </section>
      </section>
    </>
  );
};
