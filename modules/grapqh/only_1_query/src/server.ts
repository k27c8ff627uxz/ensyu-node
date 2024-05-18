import { ApolloServer, gql } from 'apollo-server';

// GraphQL
const typeDefs = gql`
  type Query {
    info: String!
    info2: String
  }
`;

const resolvers = {
  Query: {
    info: () => "info string",
    info2: () => "info2 string",
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`${url}でサーバーを起動中`));
