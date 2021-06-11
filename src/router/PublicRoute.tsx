import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { RootState } from "../redux/store";

const PublicRoute = ({ children, ...rest }: PropsWithChildren<RouteProps>) => {
  const entities = useSelector((state: RootState) => state.user.entities);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        entities?.user ? (
          <Redirect
            to={{
              pathname: "/home",
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};

export default PublicRoute;
