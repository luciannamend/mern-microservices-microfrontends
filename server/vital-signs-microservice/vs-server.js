import express from "express";
import mongoose from "mongoose";
import {ApolloServer} from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt from "jsonwebtoken";

import dotenv from 'dotenv';

dotenv.config();

import typeDefs from './src/schemas/vitalSignsSchema.js';
import resolvers from './src/resolvers/vitalSignsResolvers.js';


// Initializes the server
async function startServer() {

    // Express app to handle HTTP requests.
    const app = express();
    // Port for GraphQL server
    const PORT = 4002;

    try {
        // Connect to MongoDB;
        mongoose.connect(process.env.MONGO_URI, {})
            .then(() => console.log('Connected to MongoDB'))
            .catch(err => console.error('Error connecting to MongoDB:', err));

        // Apply middleware
        app.use(express.json());
        app.use(cookieParser());

        // Apply CORS middleware
        app.use(
            cors({
                origin: ['http://localhost:3000','http://localhost:3001','http://localhost:3002','https://studio.apollographql.com'],
                credentials: true, // Allow credentials (cookies)
            })
        );

        // Create ApolloServer instance
        const apolloServer = new ApolloServer({
            typeDefs,
            resolvers,
            introspection: true,
            context: ({ req, res }) => {
                // request token
                const token = req.cookies.token;
                let user = null;
                if (token) {
                    try {
                        user = jwt.verify(token, process.env.JWT_SECRET);
                    } catch (error) {
                        console.error("Invalid token:", error.message);
                    }
                }
                return { req, res, user };
            },
        });

        // Start Apollo Server
        await apolloServer.start();

        // Apply Apollo GraphQL middleware to the Express app
        apolloServer.applyMiddleware({ app, path: '/graphql' , cors: false});

        // Start Express server
        app.listen(PORT, () => {
            console.log(`VS Server is running on http://localhost:${PORT}/graphql`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

startServer();
