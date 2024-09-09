import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Burger-Constructor.module.scss";
import { OrderDetails } from "../Order-Details/Order-Details";
import { Modal } from "../Modal/Modal";
import { IIngredient } from "../../types/application-types/ingredient";
import { useDrop } from "react-dnd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  addIngredient,
  clear as clearConstructor,
  removeIngredient,
} from "../../services/reducers/constructor-ingredients";
import { decreaseItem } from "../../services/reducers/ingredients";
import { DragConstructorElement } from "../Drag-Constructor-Element/Drag-Constructor-Element";
import { FC, useMemo } from "react";
import { sendOrder } from "../../services/actions/order";
import { MyNotification } from "../My-Notification/My-Notification";
import { clearOrder } from "../../services/reducers/order";
import { createAction, nanoid } from "@reduxjs/toolkit";
import { setBun as setBunInConstructor } from "../../services/reducers/constructor-ingredients";
import {
  setBun as setBunInIngrdients,
  increaseItem,
  removeBun as removeBunInIngredients,
} from "../../services/reducers/ingredients";
import { useNavigate } from "react-router";

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { bun, ingredients } = useAppSelector(
    (state) => state["constructor-ingredients"]
  );

  const { user } = useAppSelector((state) => state.user);

  const { loading, success, order } = useAppSelector((state) => state.order);

  const generateAddIngredientAction = createAction(
    addIngredient.type,
    (ingredient: IIngredient) => {
      return {
        payload: {
          ingredient,
          uniqId: nanoid(),
        },
      };
    }
  );

  const onDropHandler = (ingredient: IIngredient) => {
    if (ingredient.type === "bun") {
      if (bun !== null) {
        dispatch(removeBunInIngredients(bun._id));
      }
      dispatch(setBunInIngrdients(ingredient._id));
      dispatch(setBunInConstructor(ingredient));
    } else {
      dispatch(increaseItem(ingredient._id));
      dispatch(generateAddIngredientAction(ingredient));
    }
  };

  const createOrder = () => {
    if (user === null) {
      navigate("/login");
      return;
    }
    const ids: string[] = [
      bun!._id,
      ...ingredients.map(({ ingredient }) => ingredient._id),
      bun!._id,
    ];
    dispatch(sendOrder(ids));
  };

  const totalSum = useMemo(() => {
    return (
      (bun?.price || 0) * 2 +
      ingredients.reduce((acc, { ingredient }) => acc + ingredient.price, 0)
    );
  }, [bun, ingredients]);

  const handleClose = (ingredient: IIngredient, unqid: string) => {
    dispatch(removeIngredient(unqid));
    dispatch(decreaseItem(ingredient._id));
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(itemId: IIngredient) {
      onDropHandler(itemId);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const additionalClass = isHover ? styles.dashed : "";
  let fixPositionCallBack: () => void;

  return (
    <section className={`${styles.constr} pt-25 pl-4 ml-10`}>
      <section
        className={`${styles.burger} ${additionalClass}`}
        ref={dropTarget}
        data-cy="dropTarget"
      >
        {bun && (
          <div data-cy="bun-top">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.imageMobile}
              extraClass="ml-8"
            />
          </div>
        )}

        <ul
          id="burger-constructor-list"
          data-cy="constructor"
          className={`${styles.list} scroll-pane custom-scroll`}
        >
          {ingredients.map(({ ingredient, uniqId }, index) => {
            return (
              <DragConstructorElement
                index={index}
                key={uniqId}
                ingredient={ingredient}
                uniqId={uniqId}
                handleClose={handleClose}
              />
            );
          })}
        </ul>
        {bun && (
          <div data-cy="bun-bottom">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.imageMobile}
              extraClass="ml-8"
            />
          </div>
        )}
      </section>
      <footer>
        <p className="text text_type_digits-medium mr-10">
          {totalSum}&nbsp;
          <CurrencyIcon type="primary" />
        </p>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={createOrder}
          disabled={bun === null}
          data-cy="order"
        >
          Оформить заказ
        </Button>
      </footer>
      {success === true && (
        <MyNotification success={true} message={"Заказ создался"} />
      )}
      {success === false && (
        <MyNotification success={false} message={"Заказ не удалось создать"} />
      )}
      {loading && (
        <Modal title="" closeModal={() => {}} hideClose={true}>
          <div className={`${styles.loading}`}>
            <p className="text text_type_main-medium p-15">
              Создание заказа...
            </p>
          </div>
        </Modal>
      )}
      {order && (
        <Modal
          title={""}
          closeModal={() => {
            dispatch(clearOrder());
            dispatch(clearConstructor());
          }}
        >
          <OrderDetails
            fixPositionCallback={fixPositionCallBack!}
            order={order}
          />
        </Modal>
      )}
    </section>
  );
};
