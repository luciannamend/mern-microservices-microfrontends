import VitalSigns from "../models/vitalSigns.js";

const resolvers = {
    Query: {
        vitalSigns: async (_, __, { user }) => {
            if (!user) throw new Error('You must be logged in');
            return await VitalSigns.find();
        },
    },
    Mutation: {
        addVitalSigns: async (_, { heartRate, bloodPressure, temperature }, { user }) => {
            if (!user) throw new Error('You must be logged in');

            if (heartRate == null || bloodPressure == null || temperature == null) {
                throw new Error("Invalid input: heartRate, bloodPressure, and temperature are required");
            }

            const newVital = new VitalSigns(
                { userId: user._id, heartRate, bloodPressure, temperature }
            );
            //console.log("Saving vital signs:", newVital);

            await newVital.save();
            //console.log("Saved vital signs:", newVital);

            return newVital;
        },

        updateVitalSigns: async (_, { id, heartRate, bloodPressure, temperature }, { user }) => {
            if (!user) throw new Error('You must be logged in');
            const updatedVitalSigns = await VitalSigns.findByIdAndUpdate(
                id,
                { heartRate, bloodPressure, temperature },
                { new: true } // Return the updated document
            );
            return updatedVitalSigns;
        },
    },
};



export default resolvers;