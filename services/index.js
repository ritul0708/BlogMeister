import { request, gql } from "graphql-request";

// Only Absolute URLs Supported
// const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              authorName
              bio
              id
              authorPhoto {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              categoryName
              slug
            }
          }
        }
      }
    }
  `;

  // const data = await request(graphqlAPI, query)


  const data = await request('https://api-ap-south-1.hygraph.com/v2/cldium5ec0a9301t59g07ezzl/master', query)

  
  return data.postsConnection.edges;
  
} 
