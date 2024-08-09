import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";
import styles from "./Register.module.scss";
import { FC, useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { register as registerAction } from "../../services/actions/register";
import { RequestStatus } from "../../components/RequestStatus/RequestStatus";
import { useForm } from "../../hooks/useForm";

export const Register: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { state, user } = useAppSelector((state) => ({
    state: state.user.state,
    user: state.user.user,
  }));

  const { values, handleChange } = useForm<{
    name: string;
    email: string;
    password: string;
  }>({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = values;

  const dispatch = useAppDispatch();

  const register = useCallback(() => {
    dispatch(
      registerAction({
        email,
        name,
        password,
      })
    );
  }, [name, email, password, dispatch]);

  if (state === "success" && user !== null) {
    return <Navigate to="/" replace></Navigate>;
  }

  return (
    <>
      <RequestStatus state={state} errorMessage={"Регистрация не удалась"} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          register();
        }}
      >
        <section className={`${styles.content} mt-20`}>
          <header className="text text_type_main-medium">Регистрация</header>
          <Input
            value={name}
            name="name"
            onChange={handleChange}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            extraClass="mt-6"
            placeholder="Имя"
          />
          <Input
            value={email}
            name="email"
            onChange={handleChange}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            extraClass="mt-6"
            placeholder="E-mail"
          />
          <Input
            value={password}
            name="password"
            onChange={handleChange}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            extraClass="mt-6"
            placeholder="Пароль"
            type={showPassword ? "text" : "password"}
            icon={showPassword ? "HideIcon" : "ShowIcon"}
            onIconClick={() => {
              setShowPassword(!showPassword);
            }}
          />
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            extraClass="mt-6"
            onClick={register}
          >
            Зарегистрироваться
          </Button>
          <p className="text text_type_main-default text_color_inactive mt-20">
            Уже зарегистрированы?{" "}
            <Link to="/login" className={styles.link}>
              Войти
            </Link>
          </p>
        </section>
      </form>
    </>
  );
};
