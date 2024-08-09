import ReactDOM from "react-dom";
import styles from "./My-Notificaiton.module.scss";
import { FC, useEffect, useState } from "react";

const notificationContainer = document.getElementById("notification");
if (notificationContainer === null) {
  throw new Error("Error");
}

interface MyNotificationPropTypes {
  success: boolean;
  message: string;
}

export const MyNotification: FC<MyNotificationPropTypes> = ({
  success,
  message,
}) => {
  const [showing, setShowing] = useState<boolean>(true);
  const additionalClass = success ? styles.success : styles.error;
  const additionalClass2 = showing ? styles.appearing : styles.hiding;
  useEffect(() => {
    setTimeout(() => setShowing(false), 2000);
  }, []);

  return ReactDOM.createPortal(
    <p
      className={`${styles.notification} ${additionalClass} ${additionalClass2} text text_type_main-medium p-5`}
    >
      {message}
    </p>,
    notificationContainer
  );
};
