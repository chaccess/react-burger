import { useEffect } from "react";
import { AppHeader } from "../Header/Header";
import { BurgerIngredients } from "../Burger-Ingredients/Burger-Ingredients";
import styles from "./App.module.scss";
import "../../index.css";
import { BurgerConstructor } from "../Burger-Constructor/Burger-Constructor";
import { getIngredients } from "../../services/actions/ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

const marginFromEnd = 10;

function App() {
  const { loading: isLoading } = useAppSelector((state) => state.ingredients);
  const disp = useAppDispatch();
  const calculateNewHeight = () => {
    const elements = document.getElementsByClassName(styles["main-content"]);
    if (elements.length === 0) {
      return;
    }
    const element = elements[0] as HTMLElement;
    const rect = element.getBoundingClientRect();
    const newHeight = window.innerHeight - rect.top - marginFromEnd;
    element.style.height = newHeight + "px";
  };

  useEffect(calculateNewHeight, [isLoading]);

  useEffect(() => {
    disp(getIngredients());
    window.addEventListener("resize", calculateNewHeight);
    return () => {
      window.removeEventListener("resize", calculateNewHeight);
    };
  }, [disp]);

  return (
    <>
      <AppHeader />
      <main className={`${styles["main-content"]}`}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </>
  );
}

export default App;
