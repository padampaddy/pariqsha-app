import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import PublicRoute from "./PublicRoute";
import { createApolloClient } from "../api/apollo-client";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";

export default function AppRouter() {
  const token = useSelector((state: RootState) => state.user.entities?.token);
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();
  useEffect(() => {
    setClient(createApolloClient(token || ""));
  }, [token]);

  return client ? (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <PrivateRoute path="/home">
            <Home />
          </PrivateRoute>
          <PublicRoute path="/signin">
            <Signin />
          </PublicRoute>
          <PublicRoute path="/signup">
            <Signup />
          </PublicRoute>
          <Route path="*">
            <Redirect to="/signin" />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  ) : (
    <div>Loading...</div>
  );
}
