import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
    }

    type AuthResponse {
        success: Boolean!
        message: String!
        token: String
    }

    type Query {
        currentUser: User
    }

    type Mutation {
        login(username: String!, password: String!): AuthResponse
        register(username: String!, password: String!): AuthResponse
        logout: Boolean
    }
`;

export default typeDefs;
