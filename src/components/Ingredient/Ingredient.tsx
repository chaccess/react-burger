import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Ingredient.module.scss";
import { IIngredient } from "../../types/application-types/ingredient";
import { useDrag } from "react-dnd";
import { useLocation, useNavigate } from "react-router";
import { FC } from "react";

interface IngredientPropTypes {
  ingredient: IIngredient;
  count: number;
}

export const Ingredient: FC<IngredientPropTypes> = ({ ingredient, count }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { price, name, image } = ingredient;
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  return (
    <>
      <section
        className={`${styles.ingredient} mr-6`}
        ref={dragRef}
        data-cy={`card_${ingredient._id}`}
      >
        {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
        <img
          draggable={false}
          onDragStart={(e) => {
            e.preventDefault();
          }}
          onDrag={(e) => {
            e.preventDefault();
          }}
          src={image}
          className={`mb-1 ${styles.image}`}
          onClick={() =>
            navigate(`/ingredients/${ingredient._id}`, {
              state: {
                background: location,
              },
            })
          }
          alt={name}
        />
        <p className={`${styles.price} text text_type_digits-default mb-1`}>
          {price}&nbsp;
          <CurrencyIcon type="primary" />
        </p>
        <p
          className={`${styles.name} text text_type_main-small ${styles.name}`}
          data-cy={`ingredient_${ingredient._id}`}
        >
          {name}
        </p>
      </section>
    </>
  );
};
