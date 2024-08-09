import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Burger-Ingredients.module.scss";
import { Ingredient } from "../Ingredient/Ingredient";
import { FC, useEffect, useRef, useState } from "react";
import { FillingType } from "../../types/application-types/filling-type";
import { useAppSelector } from "../../hooks/redux";

export const BurgerIngredients: FC = () => {
  const { ingredients } = useAppSelector((state) => state.ingredients);

  const scrollPane = useRef<HTMLElement>(null);
  const [currentTab, setCurrentTab] = useState<FillingType>("bun");

  useEffect(() => {
    const scrollPaneElement =
      scrollPane.current !== null ? (scrollPane.current as HTMLElement) : null;
    return () => {
      if (scrollPaneElement) {
        scrollPaneElement.removeEventListener("scroll", highLightTab);
      }
    };
  }, []);

  const scrollPaneExists = scrollPane.current !== null;

  useEffect(() => {
    const scrollPaneElement =
      scrollPane.current !== null ? (scrollPane.current as HTMLElement) : null;
    if (scrollPaneElement) {
      scrollPaneElement.addEventListener("scroll", highLightTab);
    }
  }, [scrollPaneExists]);

  function highLightTab() {
    if (!scrollPane.current) {
      return;
    }
    const pane = scrollPane.current as HTMLElement;
    const paneRect = pane.getBoundingClientRect();
    const headers = pane.querySelectorAll("header");
    let nearestHeader: HTMLElement = headers[0];
    let min = Math.abs(paneRect.top - headers[0].getBoundingClientRect().top);
    for (let i = 1; i < headers.length; i++) {
      const currentDistance = Math.abs(
        paneRect.top - headers[i].getBoundingClientRect().top
      );
      if (currentDistance < min) {
        min = currentDistance;
        nearestHeader = headers[i];
      }
    }
    const value = nearestHeader.getAttribute("data-value") as FillingType;
    setCurrentTab(value);
  }
  const noop = () => {};

  if (ingredients.length === 0) {
    return <></>;
  }

  return (
    <>
      <section className={`mt-10 ${styles.constr}`}>
        <header className={`mb-5 text text_type_main-large`}>
          Соберите бургер
        </header>
        <nav className={`${styles.tabs} mb-10`}>
          {[
            { value: "bun" as FillingType, title: "Булки" },
            { value: "sauce" as FillingType, title: "Соусы" },
            { value: "main" as FillingType, title: "Начинки" },
          ].map(({ value, title }) => (
            <Tab
              active={value === currentTab}
              value={value}
              onClick={noop}
              key={value}
            >
              {title}
            </Tab>
          ))}
        </nav>
        <section className={styles["scroll-pane"]} ref={scrollPane}>
          <header className="text text_type_main-medium" data-value="bun">
            Булки
          </header>
          <section className={`mt-6 mb-10 pl-4 ${styles.ingredients}`}>
            {ingredients
              .filter(({ ingredient }) => ingredient.type === "bun")
              .map(({ ingredient: ing, count }) => (
                <Ingredient ingredient={ing} count={count} key={ing._id} />
              ))}
          </section>
          <header className="text text_type_main-medium" data-value="sauce">
            Соусы
          </header>
          <section className={`mt-6 mb-10 pl-4 ${styles.ingredients}`}>
            {ingredients
              .filter(({ ingredient }) => ingredient.type === "sauce")
              .map(({ ingredient: ing, count }) => (
                <Ingredient ingredient={ing} count={count} key={ing._id} />
              ))}
          </section>
          <header className="text text_type_main-medium" data-value="main">
            Начинки
          </header>
          <section className={`mt-6 mb-10 pl-4 ${styles.ingredients}`}>
            {ingredients
              .filter(({ ingredient }) => ingredient.type === "main")
              .map(({ ingredient: ing, count }) => (
                <Ingredient ingredient={ing} count={count} key={ing._id} />
              ))}
          </section>
        </section>
      </section>
    </>
  );
};
