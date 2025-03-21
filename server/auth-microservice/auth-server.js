import express from "express";
import mongoose from "mongoose";
import {ApolloServer} from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();

import typeDefs from './src/schemas/authSchema.js';
import resolvers from './src/resolvers/authResolvers.js';


// Initializes the server
async function startServer() {

    // Express app to handle HTTP requests.
    const app = express();
    // Port for GraphQL server
    const PORT = 4000;

    try {
        // Connect to MongoDB
        mongoose.connect(process.env.MONGO_URI, { })
            .then(() => console.log("Connected to MongoDB"))
            .catch((err) => console.error("Error connecting to MongoDB:", err));

        // Apply middleware
        app.use(express.json());
        app.use(cookieParser());

        // Apply CORS middleware
        app.use(
            cors({
                origin: [
                    'http://localhost:3000',
                    'http://localhost:3001',
                    'http://localhost:3002',
                    'http://localhost:5173',
                    'https://studio.apollographql.com'
                ],
                credentials: true, // Allow credentials (cookies)
            })
        );

        // Create ApolloServer instance
        const apolloServer = new ApolloServer({
            typeDefs,
            resolvers,
            introspection: true,
            context: ({ req, res }) => {
                // Pass cookies from the request to the Apollo Server context
                const cookies = req.cookies;
                return { req, res, cookies };
            },
        });

        // Start Apollo Server
        await apolloServer.start();

        // Apply Apollo GraphQL middleware to the Express app
        apolloServer.applyMiddleware({ app, path: '/graphql' , cors: false});

        // Start Express server
        app.listen(PORT, () => {
            console.log(`Auth Server is running on http://localhost:${PORT}/graphql`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

startServer();
