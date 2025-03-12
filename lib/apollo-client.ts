import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_SHOPIFY_API_URL, // Shopify GraphQL API
    headers: {
      "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN as string,
      "Content-Type": "application/json",
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
