import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { RootState } from "../redux/store";

const PrivateRoute = ({ children, ...rest }: PropsWithChildren<RouteProps>) => {
  const entities = useSelector((state: RootState) => state.user.entities);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        entities?.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
