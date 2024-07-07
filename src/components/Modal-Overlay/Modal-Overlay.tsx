import styles from "./Modal-Overlay.module.scss";

export const ModalOverlay = ({ closeModal }: { closeModal: () => void }) => {
  return <div className={styles.overlay} onClick={closeModal} />;
};
