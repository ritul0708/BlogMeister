import { GraphQLClient, gql } from 'graphql-request';

const graphCMSAPI = process.env.GRAPHCMS_API_ENDPOINT;

export default async function comments(req, res) {
  const graphQLClient = new GraphQLClient(graphCMSAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_AUTH_TOKEN}` 
    },
  });

  const query = gql `
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
    }
  `;

  try {
    const result = await graphQLClient.request(query, req.body);

    return res.status(200).send(result);
  } catch(error) {
    console.log(error);
    return res.status(500).send(error);
  }
}