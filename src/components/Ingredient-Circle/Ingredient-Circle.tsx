import { FC } from "react";
import styles from "./Ingredient-Circle.module.scss";

type IngredientCirclePropTypes = {
  url: string;
  margin?: number;
  zIndex?: number;
  rest?: number;
};

export const IngredientCircle: FC<IngredientCirclePropTypes> = ({
  url,
  margin: margin_,
  zIndex: zIndex_,
  rest: rest_,
}) => {
  const margin = margin_ === undefined ? 0 : margin_;
  const zIndex = zIndex_ === undefined ? 0 : zIndex_;
  const rest = rest_ === undefined ? 0 : rest_;

  return (
    <div
      className={`${styles["container"]}`}
      style={{ left: `${margin * 50}px`, zIndex: zIndex }}
    >
      <div
        className={`${styles["debug"]} ${styles["ingredient-circle"]}`}
        style={{
          backgroundImage: `url(${url})`,
        }}
      >
        {rest !== 0 && (
          <span className="text text_type_main-default">+{rest}</span>
        )}
      </div>
    </div>
  );
};
