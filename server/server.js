const express = require('express');
const path = require('path');
require('dotenv').config();

// Import the ApolloServer class and necessary middleware
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { authMiddleware } = require('./utils/auth');

// Import the GraphQL schema (typeDefs and resolvers)
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');  // Import the Mongoose connection

const PORT = process.env.PORT || 3001;
const app = express();

// Create a new instance of ApolloServer with the GraphQL schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  try {
    // Start the Apollo Server
    await server.start();

    // Middleware to parse incoming requests
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // Apply Apollo GraphQL middleware with the authentication context
    app.use('/graphql', expressMiddleware(server, {
      context: authMiddleware
    }));

    // Serve static files in production
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/dist')));

      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
      });
    }

    // Ensure the MongoDB connection is open before starting the server
    db.once('open', () => {
      app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
      });
    });

  } catch (error) {
    console.error('Failed to start the server:', error);
  }
};

// Call the async function to start the server
startApolloServer();