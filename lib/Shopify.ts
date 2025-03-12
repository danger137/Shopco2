import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL}/api/2023-04/graphql.json`,
  cache: new InMemoryCache(),
  headers: {
    "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    "Content-Type": "application/json",
  },
});

export { client, gql };




export const getProducts = async () => {
    const GET_PRODUCTS_QUERY = gql`
      query getProducts {
        products(first: 10) {
          edges {
            node {
              id
              title
              handle
              description
              images(first: 1) {
                edges {
                  node {
                    url
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    price {
                      amount
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
  
    const { data } = await client.query({ query: GET_PRODUCTS_QUERY });
    return data.products.edges.map(({ node }: any) => node);
  };


  export const getProductByHandle = async (handle: string) => {
    const GET_PRODUCT_QUERY = gql`
      query getProductByHandle($handle: String!) {
        productByHandle(handle: $handle) {
          id
          title
          description
          images(first: 1) {
            edges {
              node {
                url
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id  # 👈 Ensure this is included
                price {
                  amount
                }
              }
            }
          }
        }
      }
    `;
  
    const { data } = await client.query({
      query: GET_PRODUCT_QUERY,
      variables: { handle },
    });
  
    return data.productByHandle;
  };
  

  
  
  export const createCheckout = async (variantId: string) => {
    const CREATE_CHECKOUT_MUTATION = gql`
      mutation checkoutCreate($variantId: ID!) {
        checkoutCreate(input: { lineItems: [{ variantId: $variantId, quantity: 1 }] }) {
          checkout {
            webUrl
          }
        }
      }
    `;
  
    const { data } = await client.mutate({
      mutation: CREATE_CHECKOUT_MUTATION,
      variables: { variantId },
    });
  
    return data.checkoutCreate.checkout.webUrl;
  };
  