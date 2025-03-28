import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import session from 'express-session';
import { Session } from 'express-session';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import sequelize from './config/database';
import 'dotenv/config';

// Type assertion to satisfy Apollo Server's Application type
const app = express() as any;

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production', httpOnly: true },
  })
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
  req, 
  user: (req.session as Session & { userId?: number }).userId 
    ? { id: (req.session as any).userId } 
    : null 
}),

});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
  await sequelize.sync();
  const port = process.env.PORT || 4000;
  app.listen({ port, host: 'localhost' }, () =>
    console.log(`Server running on http://localhost:${port}${server.graphqlPath}`)
  );
}

startServer().catch((err) => console.error('Server failed to start:', err));