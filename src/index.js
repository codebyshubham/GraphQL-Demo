const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const Query = require('./resolvers/query')
const Mutation = require('./resolvers/mutation');
const AuthPayload = require('./resolvers/authPayload');
const Subscription = require('./resolvers/subscription');
const Feed = require('./resolvers/feed');
const dotenv = require('dotenv').config();

const resolvers = {
  Query,
  Mutation,
  AuthPayload,
  Subscription,
  Feed,
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: process.env.PRISMA_ENDPOINT,
      secret: process.env.PRISMA_SECRET,
      debug: true,
    }),
  }),
});

server.start(() => console.log('server is running on localhost:4000'));