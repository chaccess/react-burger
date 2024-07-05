import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredient } from "../../types/ingredient";
import styles from "./Drag-Constructor-Element.module.scss";
import { XYCoord, useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import type { Identifier } from "dnd-core";
import { changeOrder } from "../../services/reducers/constructor-ingredients";
import { useAppDispatch } from "../../hooks/redux";

interface DragConstructorElementPropTypes {
  ingredient: IIngredient;
  uniqId: string;
  handleClose: (ingredient: IIngredient, uniqId: string) => void;
  index: number;
}

interface DragItem {
  uniqId: string;
  index: number;
}

export const DragConstructorElement = ({
  ingredient,
  handleClose,
  uniqId,
  index,
}: DragConstructorElementPropTypes) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "constr",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      dispatch(changeOrder({ fromIndex: dragIndex, toIndex: hoverIndex }));

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "constr",
    item: { uniqId, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));

  const dashedClass = isDragging ? styles.dashed : "";

  return (
    <li className={`${styles.ingredient} ${dashedClass} mb-4`}>
      <section className={styles.drag} ref={ref} data-handler-id={handlerId}>
        <DragIcon type="primary" />
      </section>
      <ConstructorElement
        extraClass="ml-8"
        isLocked={false}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.imageMobile}
        handleClose={() => handleClose(ingredient, uniqId)}
      />
    </li>
  );
};
