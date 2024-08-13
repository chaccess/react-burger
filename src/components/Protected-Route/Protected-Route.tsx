import { FC } from "react";
import { useAppSelector } from "../../hooks/redux";
import { Navigate, useLocation } from "react-router-dom";

type TProtectedProps = {
  onlyUnAuth?: boolean;
  component: JSX.Element;
};

const Protected: FC<TProtectedProps> = ({ onlyUnAuth = false, component }) => {
  const isAuthenticated = useAppSelector((store) => store.user.user != null);
  const location = useLocation();

  if (onlyUnAuth && isAuthenticated) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: { component: JSX.Element }) => (
  <Protected onlyUnAuth={true} component={component} />
);
