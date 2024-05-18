import fs from 'fs';
import path from 'path';
import { ApolloServer } from 'apollo-server';

// TODO: to generate by gql
type Link = { id: string; description: string; url: string };

// TODO: generating by gql
let list: Link[] = [];

const resolvers = {
  Query: {
    feed: () => list
  },
  Mutation: {
    // TODO: to generate by gql
    post: (_parent: any, args: { description: string, url: string }) => {
      const data: Link = {
        id: `id-${list.length}`,
        description: args.description,
        url: args.url,
      };
      list = [...list, data];
      return data;
    }
  }
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.gql"), "utf-8"),
  resolvers,
});

server
  .listen()
  .then(({ url }) => console.log(`${url}でサーバーを起動中`));
