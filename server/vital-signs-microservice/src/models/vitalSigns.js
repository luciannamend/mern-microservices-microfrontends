import mongoose from "mongoose";

const vitalSignsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User is required"],
    },
    heartRate: {
        type: Number,
        required: [true, "Heart rate is required"],
        min: 30,  // Set reasonable lower limit
        max: 200, // Set reasonable upper limit
    },
    bloodPressure: {
        type: String,
        required: [true, "Blood pressure is required"],
    },
    temperature: {
        type: Number,
        required: [true, "Temperature is required"],
        min: 30,
        max: 45,
    }
}, { timestamps: true });

const VitalSigns = mongoose.model('VitalSigns', vitalSignsSchema);


export default VitalSigns;