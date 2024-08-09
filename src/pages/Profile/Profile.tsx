import { Link, useLocation } from "react-router-dom";
import styles from "./Profile.module.scss";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RequestStatus } from "../../components/RequestStatus/RequestStatus";
import { logout as logoutAction } from "../../services/actions/logout";
import { changeUserInfo as changeUserInfoAction } from "../../services/actions/change-user-info";
import { User } from "../../types/application-types/user";
import { useForm } from "../../hooks/useForm";

export const Profile: FC = () => {
  const { pathname } = useLocation();
  const { user, state, errorMessage } = useAppSelector((state) => ({
    user: state.user.user as User,
    state: state.user.state,
    errorMessage: state.user.errorMessage,
  }));
  const { values, setValues, handleChange } = useForm<{
    name: string;
    email: string;
    password: string;
  }>({
    name: user.name,
    email: user.email,
    password: "",
  });
  const { name, email, password } = values;
  const [successMessage, setSuccessMessage] = useState<string>("");
  const dispatch = useAppDispatch();

  if (user == null) {
    throw new Error("Ошибка в коде");
  }

  useEffect(() => {
    fixPosition();
    window.addEventListener("load", fixPosition);
    window.addEventListener("resize", fixPosition);
    return () => {
      window.removeEventListener("resize", fixPosition);
      window.removeEventListener("load", fixPosition);
    };
  }, []);

  const reset = () => {
    setValues({
      name: user.name,
      email: user.email,
      password: "",
    });
  };

  const isChanged =
    user.name !== name || user.email !== email || password !== "";

  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  const changeUserInfo = useCallback(() => {
    setSuccessMessage("Данные пользователя обновлены");
    dispatch(
      changeUserInfoAction({
        name,
        email,
        password,
      })
    );
  }, [email, name, password, dispatch]);

  const fixPosition = () => {
    const container = document.getElementsByClassName(
      `${styles.content}`
    )[0] as HTMLElement;
    container.style.marginLeft = "0px";
    const body = document.getElementsByClassName(`${styles.body}`)[0];
    const rect = body.getBoundingClientRect();
    const currentLeft = rect.left;
    const targetLeft = (document.body.clientWidth - rect.width) / 2;
    const delta = targetLeft - currentLeft;
    container.style.marginLeft = delta + "px";
  };

  return (
    <>
      <RequestStatus
        state={state}
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
      <section className={`${styles.content} mt-20`}>
        <section className={`${styles.menu} pr-15`}>
          <ul>
            <li>
              <Link
                to="/profile"
                className={`text text_type_main-medium ${styles.link} ${
                  pathname === "/profile"
                    ? "text_color_primary"
                    : "text_color_inactive"
                }`}
              >
                Профиль
              </Link>
            </li>
            <li className="mt-2">
              <Link
                to="/profile/orders"
                className={`text text_type_main-medium ${styles.link} ${
                  pathname === "/profile/orders"
                    ? "text_color_primary"
                    : "text_color_inactive"
                }`}
              >
                История заказов
              </Link>
            </li>
            <li className="mt-2">
              <p
                className={`text text_type_main-medium text_color_inactive ${styles.link}`}
                onClick={logout}
              >
                Выход
              </p>
            </li>
          </ul>
          <p className="text text_type_main-default text_color_inactive mt-20">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </section>
        <section className={`${styles.body}`}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              changeUserInfo();
            }}
          >
            <Input
              value={name}
              onChange={handleChange}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              placeholder={`Имя`}
              icon="EditIcon"
              onSubmit={changeUserInfo}
              name="name"
            />
            <Input
              value={email}
              onChange={handleChange}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              placeholder={`Логин`}
              extraClass="mt-6"
              icon="EditIcon"
              name="email"
            />
            <PasswordInput
              value={password}
              onChange={handleChange}
              placeholder={`Пароль`}
              extraClass="mt-6"
              icon="EditIcon"
              name="password"
            />
            {isChanged && (
              <p>
                <Button
                  htmlType="button"
                  type="secondary"
                  size="medium"
                  onClick={reset}
                >
                  Отмена
                </Button>
                <Button
                  htmlType="submit"
                  type="primary"
                  size="medium"
                  extraClass="mt-6"
                >
                  Сохранить
                </Button>
              </p>
            )}
          </form>
        </section>
      </section>
    </>
  );
};
