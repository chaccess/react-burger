import { useLocation, useParams } from "react-router";
import styles from "./Ingredient-Details.module.scss";
import { useAppSelector } from "../../hooks/redux";
import { AppState } from "../../services/store";
import { FC } from "react";

export const IngredientDetails: FC = () => {
  const { id } = useParams() || "";
  const location = useLocation();
  const background = location.state && location.state.background;
  const isInModal = !!background;

  const { success, ingredients } = useAppSelector(
    (state: AppState) => state.ingredients
  );
  if (!success) {
    return null;
  }
  const { imageLarge, name, calories, proteins, fat, carbohydrates } =
    ingredients.filter(({ ingredient }) => ingredient._id === id)[0].ingredient;

  const digitClass = "text text_type_digits-default";
  const additionalClass = isInModal ? styles["modal-border"] : "";

  return (
    <section className={`${styles.content} ${additionalClass} pr-10 pl-10`}>
      {!isInModal && (
        <p className="text text_type_main-large mt-30">Детали ингредиента</p>
      )}
      <section className={`${styles.image} mb-4`}>
        <img src={imageLarge} alt={name} />
      </section>
      <p className="text text_type_main-medium mb-8">{name}</p>
      <ul
        className={`${styles.parts} text text_type_main-default text_color_inactive mb-15`}
      >
        <li className="mr-5">
          <p>Калории, ккал</p>
          <p className={digitClass}>{calories}</p>
        </li>
        <li className="mr-5">
          <p>Белки, г</p>
          <p className={digitClass}>{proteins}</p>
        </li>
        <li className="mr-5">
          <p>Жиры, г</p>
          <p className={digitClass}>{fat}</p>
        </li>
        <li>
          <p>Углеводы, г</p>
          <p className={digitClass}>{carbohydrates}</p>
        </li>
      </ul>
    </section>
  );
};
