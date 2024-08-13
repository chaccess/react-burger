import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BurgerConstructor } from "../../components/Burger-Constructor/Burger-Constructor";
import { BurgerIngredients } from "../../components/Burger-Ingredients/Burger-Ingredients";
import { FC } from "react";

export const Home: FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <BurgerIngredients />
      <BurgerConstructor />
    </DndProvider>
  );
};
