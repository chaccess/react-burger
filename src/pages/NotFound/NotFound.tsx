import { FC } from "react";
import styles from "./NotFound.module.scss";

export const NotFound: FC = () => {
  return <p className={`${styles.content} text text_type_digits-large`}>404</p>;
};
