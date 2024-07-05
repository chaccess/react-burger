import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Ingredient.module.scss";
import { IIngredient } from "../../types/ingredient";
import { useDrag } from "react-dnd";
import { setCurrentItem } from "../../services/reducers/current-ingredient";
import { useAppDispatch } from "../../hooks/redux";

interface IngredientPropTypes {
  ingredient: IIngredient;
  count: number;
}

export const Ingredient = ({ ingredient, count }: IngredientPropTypes) => {
  const { price, name, image } = ingredient;
  const dispatch = useAppDispatch();
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  return (
    <>
      <section className={`${styles.ingredient} mr-6`} ref={dragRef}>
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
          onClick={() => dispatch(setCurrentItem(ingredient))}
          alt={name}
        />
        <p className={`${styles.price} text text_type_digits-default mb-1`}>
          {price}&nbsp;
          <CurrencyIcon type="primary" />
        </p>
        <p
          className={`${styles.name} text text_type_main-small ${styles.name}`}
        >
          {name}
        </p>
      </section>
    </>
  );
};
