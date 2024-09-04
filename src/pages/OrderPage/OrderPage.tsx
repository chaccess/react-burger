import { FC } from "react";
import { Order } from "../../components/Order/Order";
import { Modal } from "../../components/Modal/Modal";
import { useLocation, useNavigate } from "react-router";

export const OrderPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;
  const isInModal = !!background;

  if (isInModal) {
    return (
      <Modal title="" closeModal={() => navigate(-1)}>
        <Order isInModal={true} />
      </Modal>
    );
  } else {
    return <Order isInModal={false} />;
  }
};
