import { ApolloServer, gql } from 'apollo-server';

// GraphQL
const typeDefs = gql`
  type Query {
    info: String!
    feed: [Link]!
  }
  
  type Link {
    id: ID!
    description: String!
    url: String!
  }
`;

const resolvers = {
  Query: {
    info: () => "info string",
    feed: () => [...Array(3)].map((_, i) => ({
      id: `link-${i}`,
      description: `description-${i}`,
      url: `www.url-${i}`,
    })),
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`${url}でサーバーを起動中`));
