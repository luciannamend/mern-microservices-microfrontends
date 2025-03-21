import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type VitalSigns {
        id: ID!
        userId: ID!
        heartRate: Int!
        bloodPressure: String!
        temperature: Int!
    }

    type Query {
        vitalSigns: [VitalSigns]
    }

    type Mutation {
        addVitalSigns(heartRate: Int!, bloodPressure: String!, temperature: Int!): VitalSigns
        updateVitalSigns(id: ID!, heartRate: Int, bloodPressure: String, temperature: Int): VitalSigns
    }
`;


export default typeDefs;