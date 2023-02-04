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



export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: {slug: $slug}) {
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
        content {
          raw
        }
      }
    }
  `;
  const data = await request(graphqlAPI, query, { slug })

  return data.post;
} 


export const getRecentPosts = async () => {
  const query = gql `
    query GetPostDetails() {
      posts(orderBy: createdAt_ASC, last: 3) {
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


export const getSimilarPosts = async (categories, slug) => {
  const query = gql `
    query GetPostDetails ($slug: String!, $categories: [String!]) {
      posts(
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
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

  const data = await request(graphqlAPI, query, { categories, slug })

  return data.posts;
}



export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        categoryName,
        slug
      }
    }
  `;

  const data = await request(graphqlAPI, query)

  return data.categories;
}
