import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";
import styles from "./ForgotPassword.module.scss";
import { FC, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RequestStatus } from "../../components/RequestStatus/RequestStatus";
import { passwordReset } from "../../services/actions/password-reset";
import { resetPasswordCalled } from "../../config";
import { reset } from "../../services/reducers/user";
import { useForm } from "../../hooks/useForm";

export const ForgotPassword: FC = () => {
  const dispatch = useAppDispatch();
  const { state, errorMessage } = useAppSelector((state) => ({
    state: state.user.state,
    errorMessage: state.user.errorMessage,
  }));
  const { values, handleChange } = useForm<{ email: string }>({
    email: "",
  });
  const { email } = values;

  useEffect(() => {
    localStorage.removeItem(resetPasswordCalled);
  }, []);

  const resetPassword = useCallback(() => {
    dispatch(
      passwordReset({
        email,
      })
    );
  }, [email, dispatch]);

  const isPasswordSent = localStorage.getItem(resetPasswordCalled) === "1";
  if (isPasswordSent) {
    dispatch(reset());
    return (
      <Navigate
        to="/reset-password"
        state={{
          message: "Код выслан",
        }}
      />
    );
  }

  return (
    <>
      <RequestStatus state={state} errorMessage={errorMessage} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          resetPassword();
        }}
      >
        <section className={`${styles.content} mt-20`}>
          <header className="text text_type_main-medium">
            Восстановление пароля
          </header>

          <Input
            value={email}
            onChange={handleChange}
            extraClass="mt-6"
            placeholder="Укажите e-mail"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            name="email"
          />
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            extraClass="mt-6"
          >
            Восстановить
          </Button>
          <p className="text text_type_main-default text_color_inactive mt-20">
            Вспомнили пароль?{" "}
            <Link to="/login" className={styles.link}>
              Войти
            </Link>
          </p>
        </section>
      </form>
    </>
  );
};
