import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";
import { ModalOverlay } from "../Modal-Overlay/Modal-Overlay";
import { createContext, FC, ReactNode, useEffect } from "react";
import { linkHandler } from "../../utils/common";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("modal");
if (modalRoot === null) {
  throw new Error("Error");
}

interface ModalPropTypes {
  closeModal: () => void;
  children: ReactNode;
  title: string;
  hideClose?: boolean;
}

export const ModalContext = createContext({
  setPosition: () => {},
});

export const Modal: FC<ModalPropTypes> = ({
  closeModal,
  children,
  title,
  hideClose = false,
}) => {
  const handlerKeyPress = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    if (!hideClose) {
      window.document.body.addEventListener("keydown", handlerKeyPress);
    }

    return () => {
      if (!hideClose) {
        window.document.body.removeEventListener("keydown", handlerKeyPress);
      }
    };
  });

  const additionalClass = title === "" ? styles.abs : "";

  return ReactDOM.createPortal(
    <>
      <ModalOverlay closeModal={closeModal} />
      <div className={styles.modal}>
        {!hideClose && (
          <header
            className={`${styles.header} ${additionalClass} pl-10 pr-10 pt-10`}
          >
            <p className={`${styles.title} text text_type_main-large`}>
              {title}
            </p>
            <a
              href="/"
              onClick={(e) => linkHandler(e, closeModal)}
              data-cy="close-modal"
            >
              <CloseIcon type="primary" />
            </a>
          </header>
        )}
        {children}
      </div>
    </>,
    modalRoot
  );
};
