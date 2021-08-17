import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  fromPromise,
  from,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { GRAPHQL_URL, GRAPHQL_URL_WS } from "../Constants";
import { onError } from "@apollo/client/link/error";
import { refreshToken } from "./user-api";
import userSlice, { getEntities } from "../redux/slices/user-slice";
import store from "../redux/store";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { getMainDefinition } from "@apollo/client/utilities";

export const createApolloClient = () => {
  const httpLink = new HttpLink({
    uri: GRAPHQL_URL,
    headers: {
      Authorization: `Bearer ${getEntities()?.token}`,
    },
  });

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.log(err);
        switch (err.extensions?.code) {
          case "invalid-jwt":
            return fromPromise(refreshToken()).flatMap((token) => {
              if (token) {
                store.dispatch(userSlice.actions.saveToken(token));
                const oldHeaders = operation.getContext().headers;
                // modify the operation context with a new token
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${token}`,
                  },
                });
                console.log(oldHeaders);
                console.log("new headers", {
                  ...oldHeaders,
                  authorization: `Bearer ${token}`,
                });
                // retry the request, returning the new observable
              }
              return forward(operation);
            });
        }
      }
    }
    return forward(operation);
  });

  const wsTransport = new SubscriptionClient(GRAPHQL_URL_WS, {
    reconnect: true,
    connectionParams: {
      headers: {
        Authorization: `Bearer ${getEntities()?.token}`,
      },
    },
  });
  wsTransport.onError((err) => {
    console.log(err);
  });
  const wsLink = new WebSocketLink(wsTransport);

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  return new ApolloClient({
    link: from([errorLink, splitLink]),
    cache: new InMemoryCache(),
  });
};
