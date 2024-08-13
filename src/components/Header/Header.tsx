import { FC } from "react";
import styles from "./Header.module.scss";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const AppHeader: FC = () => {
  const itemCss = "p-5 mt-4 mb-4";
  return (
    <header className={styles.header}>
      <nav className={styles.firstMenu}>
        <ul className={styles.menu}>
          <li className={itemCss}>
            <BurgerIcon type="primary" />
            <span className="text text_type_main-small ml-2">Конструктор</span>
          </li>
          <li className={`${itemCss} ml-2`}>
            <ListIcon type="secondary" />
            <span className="text text_type_main-small text_color_inactive ml-2">
              Лента заказов
            </span>
          </li>
        </ul>
      </nav>
      <nav className={styles.logo}>
        <Logo />
      </nav>
      <nav className={styles["last-menu"]}>
        <ul className={styles.menu}>
          <li className={itemCss}>
            <ProfileIcon type="secondary" />
            <span className="text text_type_main-small text_color_inactive ml-2">
              Личный кабинет
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
};
