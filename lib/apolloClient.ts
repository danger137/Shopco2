import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;


if (!CONTENTFUL_SPACE_ID) {
  console.error("❌ Contentful Space ID is missing!");
}

if (!CONTENTFUL_ACCESS_TOKEN) {
  console.error("❌ Contentful Access Token is missing!");
}

export  const client = new ApolloClient({
  link: new HttpLink({
    uri: `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`,
    headers: {
      Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
    },
  }),
  cache: new InMemoryCache(),
});
