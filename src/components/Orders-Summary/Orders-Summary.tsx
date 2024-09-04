import { FC } from "react";
import styles from "./Orders-Summary.module.scss";
import { useAppSelector } from "../../hooks/redux";
import { OrderInFeed } from "../../types/application-types/order-in-feed";

export const OrdersSummary: FC = () => {
  const data = useAppSelector((data) => data.feed);
  const maxColumnSize = 10;
  const ready = data
    ? data.orders.filter((order: OrderInFeed) => order.status === "done")
    : [];
  const columns: number[][] = [];
  ready.forEach((order: OrderInFeed, i: number) => {
    if (i % maxColumnSize === 0) {
      columns.push([]);
    }
    columns[columns.length - 1].push(order.number);
  });

  const inProcessing = data
    ? data.orders.filter((order: OrderInFeed) => order.status !== "done")
    : [];
  const columnsProcessing: number[][] = [];
  inProcessing.forEach((order: OrderInFeed, i: number) => {
    if (i % maxColumnSize === 0) {
      columnsProcessing.push([]);
    }
    columnsProcessing[columnsProcessing.length - 1].push(order.number);
  });

  const formatNumber = (number: number) =>
    new Intl.NumberFormat("ru-RU").format(number);

  return (
    <section className={`mt-25 ${styles["container"]} ml-15`}>
      <section className={`mb-15 ${styles["orders-summary"]}`}>
        <section>
          <header className={`mb-6 text text_type_main-large`}>Готовы:</header>
          <section className={`${styles.columns}`}>
            {columns.map((column, i) => {
              return (
                <div className={`${styles.column} mr-2`} key={i}>
                  {column.map((number) => {
                    return (
                      <p
                        className="text text_type_digits-default text_color_success mb-2"
                        key={number}
                      >
                        {number}
                      </p>
                    );
                  })}
                </div>
              );
            })}
          </section>
        </section>
        <section className="ml-9">
          <header className={`mb-6 text text_type_main-large`}>
            В&nbsp;работе:
          </header>
          <section className={`${styles.columns}`}>
            {columnsProcessing.map((column, i) => {
              return (
                <div className={`${styles.column} mr-2`} key={i}>
                  {column.map((number, i) => {
                    return (
                      <p
                        className="text text_type_digits-default text_color_primary mb-2"
                        key={number}
                      >
                        {number}
                      </p>
                    );
                  })}
                </div>
              );
            })}
          </section>
        </section>
      </section>
      <header className={`text text_type_main-large`}>
        Выполнено за всё время:
      </header>
      <p className={`text text_type_digits-large mb-15 ${styles["number"]}`}>
        {formatNumber(data.total)}
      </p>
      <header className={`text text_type_main-large`}>
        Выполнено за сегодня:
      </header>
      <p className={`text text_type_digits-large ${styles["number"]}`}>
        {formatNumber(data.totalToday)}
      </p>
    </section>
  );
};
