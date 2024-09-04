import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredient } from "../../types/application-types/ingredient";
import styles from "./Drag-Constructor-Element.module.scss";
import { DragSourceMonitor, XYCoord, useDrag, useDrop } from "react-dnd";
import { FC, useRef } from "react";
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

export const DragConstructorElement: FC<DragConstructorElementPropTypes> = ({
  ingredient,
  handleClose,
  uniqId,
  index,
}) => {
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

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(changeOrder({ fromIndex: dragIndex, toIndex: hoverIndex }));

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "constr",
    item: { uniqId, index },
    collect: (
      monitor: DragSourceMonitor<{ uniqId: string; index: number }, unknown>
    ) => ({
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
