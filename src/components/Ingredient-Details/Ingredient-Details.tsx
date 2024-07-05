import styles from "./Ingredient-Details.module.scss";
import { IIngredient } from "../../types/ingredient";

export const IngredientDetails = ({
  imageLarge,
  name,
  calories,
  carbohydrates,
  fat,
  proteins,
}: IIngredient) => {
  const digitClass = "text text_type_digits-default";
  return (
    <section className={`${styles.content} pr-10 pl-10`}>
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
