import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const server = new ApolloServer({
  typeDefs: `#graphql
    type Query {
      hello: String
    }
  `,
  resolvers: {
    Query: {
      hello: () => 'Hello world!',
    },
  },
});

startStandaloneServer(server, {
  listen: { port: 4112 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
