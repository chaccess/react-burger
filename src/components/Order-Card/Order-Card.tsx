import { FC, useMemo } from "react";
import styles from "./Order-Card.module.scss";
import { IngredientCircle } from "../Ingredient-Circle/Ingredient-Circle";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useStorage } from "../../hooks/useStorage";
import { OrderInFeed } from "../../types/application-types/order-in-feed";
import { useAppSelector } from "../../hooks/redux";
import { getStatus } from "../../utils/common";
import { useDispatch } from "react-redux";
import { resetState } from "../../services/reducers/order-details";

export type OrderCardPropTypes = {
  inProfile?: boolean;
  order: OrderInFeed;
};

export const OrderCard: FC<OrderCardPropTypes> = ({
  inProfile = false,
  order,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setKey } = useStorage();
  const { ingredients } = useAppSelector((state) => state.ingredients);
  const location = useLocation();

  const mapUrlsPrices = useMemo(
    () =>
      ingredients
        .map((ing) => ing.ingredient)
        .reduce((acc, cur) => {
          if (!acc.has(cur._id)) {
            acc.set(cur._id, { url: cur.imageMobile, price: cur.price });
          }
          return acc;
        }, new Map<string, { url: string; price: number }>()),
    [ingredients]
  );

  const imgs: string[] = order.ingredients.map(
    (ing) => mapUrlsPrices.get(ing)?.url || ""
  );

  const price = order.ingredients.reduce((acc, cur) => {
    return acc + (mapUrlsPrices.get(cur)?.price || 0);
  }, 0);

  const MAX_IMGS = 6;
  const rest = imgs.length - MAX_IMGS;

  return (
    <div
      className={`p-6 mb-4 ${styles["debug"]} ${styles["card"]} ${
        inProfile ? styles["profile-width"] : ""
      }`}
      onClick={() => {
        setKey("modal", "true");
        dispatch(resetState());
        if (inProfile) {
          navigate(`/profile/orders/${order.number}`, {
            state: {
              background: location,
            },
          });
        } else {
          navigate(`/feed/${order.number}`, {
            state: {
              background: location,
            },
          });
        }
      }}
    >
      <div className={`${styles["number"]} mb-6`}>
        <p className="text text_type_digits-default">#{order.number}</p>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.createdAt)} />
        </p>
      </div>
      <p className="text text_type_main-medium">{order.name}</p>
      {inProfile && (
        <p
          className={`text text_type_main-default mt-2 ${
            order.status === "done"
              ? "text_color_success"
              : order.status === "cancelled"
              ? "text_color_error"
              : ""
          }`}
        >
          {getStatus(order.status)}
        </p>
      )}
      <div className={`${styles["footer"]} mt-6`}>
        <div className={`${styles["ingredients"]}`}>
          {imgs
            .filter((e, i) => i < MAX_IMGS)
            .map((e, i) => (
              <IngredientCircle
                key={i}
                url={e}
                margin={i}
                zIndex={imgs.length - i}
                rest={i < MAX_IMGS - 1 ? 0 : rest}
              />
            ))}
        </div>
        <div className={`${styles["price"]}`}>
          <p className="text text_type_digits-default mr-2">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
