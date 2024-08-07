import { ApolloServer, gql } from 'apollo-server-micro';
import { client } from '../../lib/contentful';
import { GET_ALL_POSTS } from '../../lib/queries';

const typeDefs = gql`
  type BlogPost {
    title: String
    slug: String
    content: String
  }

  type Query {
    blogPosts: [BlogPost]
  }
`;

const resolvers = {
  Query: {
    blogPosts: async () => {
      const data = await client.request(GET_ALL_POSTS);
      return data.blogPostCollection.items;
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  await startServer;
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
