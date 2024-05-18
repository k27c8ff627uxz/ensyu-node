const { ApolloServer, gql } = require('apollo-server');

// GraphQL
const typeDefs = gql`
  type Query {
    info: String!
  }
`;

const resolvers = {
  Query: {
    info: () => "info string"
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(({ url }) => console.log(`${url}でサーバーを起動中`));
