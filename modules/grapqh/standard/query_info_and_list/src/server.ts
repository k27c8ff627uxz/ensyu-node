import fs from 'fs';
import path from 'path';
import { ApolloServer } from 'apollo-server';


const resolvers = {
  Query: {
    info: () => "info string",
    info2: () => "info2 string",
    feed: () => [...Array(3)].map((_, i) => ({
      id: `link-${i}`,
      description: `description-${i}`,
      url: `www.url-${i}`,
    })),
  }
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.gql"), "utf-8"),
  resolvers,
});

server
  .listen()
  .then(({ url }) => console.log(`${url}でサーバーを起動中`));
