import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import { Query, QuerySquareArgs, Resolvers, MutationSetHelloArgs} from './gql/graphql';

const typeDefs = readFileSync("./src/schemas/schema.graphql", { encoding: "utf-8" });

const resolvers: Resolvers = {
  Query: {
    hello: () => "Hello world!",
    square: (parent, args: QuerySquareArgs, contextValue, info) => args.num * args.num,
  },
  Mutation: {
    setHello: (parent, args: MutationSetHelloArgs, contextValue, info) => {
      return `Hello, ${args.name}!`;
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4112 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
