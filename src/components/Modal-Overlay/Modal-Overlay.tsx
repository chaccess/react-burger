import { FC } from "react";
import styles from "./Modal-Overlay.module.scss";

interface ModalOverlayPropTypes {
  closeModal: () => void;
}

export const ModalOverlay: FC<ModalOverlayPropTypes> = ({
  closeModal,
}: {
  closeModal: () => void;
}) => {
  return <div className={styles.overlay} onClick={closeModal} />;
};
