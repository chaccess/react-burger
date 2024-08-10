import { Link, useLocation } from "react-router-dom";
import styles from "./App-Header.module.scss";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";

export const AppHeader : FC = () => {
  const location = useLocation();
  const { pathname: path } = location;
  const itemCss = "p-5 mt-4 mb-4";
  return (
    <header className={styles.header}>
      <nav className={styles.firstMenu}>
        <ul className={styles.menu}>
          <li className={itemCss}>
            <Link to="/" className={styles.link}>
              <BurgerIcon type={path === "/" ? "primary" : "secondary"} />
              <span
                className={`text text_type_main-small ml-2 ${
                  path === "/" ? "text_color_primary" : "text_color_inactive"
                }`}
              >
                Конструктор
              </span>
            </Link>
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
        <Link to="/">
          <Logo />
        </Link>
      </nav>
      <nav className={styles["last-menu"]}>
        <ul className={styles.menu}>
          <li className={itemCss}>
            <Link to="/profile" className={styles.link}>
              <ProfileIcon
                type={path.startsWith("/profile") ? "primary" : "secondary"}
              />
              <span
                className={`text text_type_main-small ml-2 ${
                  path.startsWith("/profile")
                    ? "text_color_primary"
                    : "text_color_inactive"
                }`}
              >
                Личный кабинет
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
