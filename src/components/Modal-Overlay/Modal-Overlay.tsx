import ReactDOM from "react-dom";
import styles from "./Modal-Overlay.module.scss";

const modalOverlay = document.getElementById("modal-overlay");
if (modalOverlay === null) {
  throw new Error("Error!");
}

interface ModalOverlayPropTypes {
  closeModal: () => void;
}

export const ModalOverlay = ({ closeModal }: ModalOverlayPropTypes) => {
  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={closeModal} />,
    modalOverlay
  );
};
