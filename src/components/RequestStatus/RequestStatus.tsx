import { FC } from "react";
import { RequestState } from "../../types/application-types/request-state";
import { Modal } from "../Modal/Modal";
import { MyNotification } from "../My-Notification/My-Notification";
import styles from "./RequestStatus.module.scss";

type RequestStatusPropTypes = {
  state: RequestState;
  errorMessage?: string;
  successMessage?: string;
};

export const RequestStatus: FC<RequestStatusPropTypes> = ({
  state,
  errorMessage = "",
  successMessage = "",
}) => {
  return (
    <>
      {state === "init" && <></>}
      {state === "pending" && (
        <Modal title="" closeModal={() => {}} hideClose={true}>
          <div className={`${styles.loading}`}>
            <p className="text text_type_main-medium p-15">Загрузка...</p>
          </div>
        </Modal>
      )}
      {state === "error" && errorMessage !== "" && (
        <MyNotification success={false} message={errorMessage} />
      )}
      {state === "success" && successMessage !== "" && (
        <MyNotification success={true} message={successMessage} />
      )}
    </>
  );
};
