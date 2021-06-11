import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { GRAPHQL_URL } from "../Constants";

export const createApolloClient = (authToken: string) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: GRAPHQL_URL,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }),
    cache: new InMemoryCache(),
  });
};
