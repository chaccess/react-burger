import styles from "./Order-Details.module.scss";
import ok from "../../images/ok.png";
import { FC } from "react";

interface OrderDetailsPropTypes {
  fixPositionCallback: () => void;
  order: {
    name: string;
    number: number;
  };
}

export const OrderDetails: FC<OrderDetailsPropTypes> = ({
  fixPositionCallback,
  order,
}) => {
  return (
    <section className={`${styles.content} pl-30 pr-30`}>
      <section className={`${styles["order-number"]} mt-30 mb-8`}>
        <p className="text text_type_digits-large" data-cy="order-number">
          {order.number}
        </p>
      </section>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img src={ok} alt="ok" className="mb-15" onLoad={fixPositionCallback} />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mb-30">
        Дождитель готовности на орбитальной станции
      </p>
    </section>
  );
};
