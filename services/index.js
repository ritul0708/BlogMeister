import { request, gql } from "graphql-request";

// Only Absolute URLs Supported
// const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;

const graphqlAPI = 'https://api-ap-south-1.hygraph.com/v2/cldium5ec0a9301t59g07ezzl/master';

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


  const data = await request(graphqlAPI, query)

  return data.postsConnection.edges;
  
} 


export const getRecentPosts = async () => {
  const query = gql `
    query getPostDetails() {
      posts(orderBy: publishedAt_ASC, last: 3) {
        title
        featuredImage {
          url
        }
        slug
        createdAt
      }
    }
  `;

  const data = await request(graphqlAPI, query)

  return data.posts;
}


export const getSimilarPosts = async () => {
  const query = gql `
    query getPostDetails ($slug: String!, $category: [String!]) {
      posts(
        where: {slug_not: "$slug", AND: {categories_some: {slug_in: "$categories"}}}
        last: 3
      ) {
        title
        slug
        featuredImage {
          url
        }
        createdAt
      }
    }
  `;

  const data = await request(graphqlAPI, query)

  return data.posts;
}
