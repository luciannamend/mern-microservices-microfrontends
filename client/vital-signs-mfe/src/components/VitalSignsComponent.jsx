import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import "../styles/VitalSigns.css"

const GET_VITAL_SIGNS = gql`
    query GetVitalSigns {
        vitalSigns {
            id
            heartRate
            bloodPressure
            temperature
        }
    }
`;

const ADD_VITAL_SIGNS = gql`
    mutation AddVitalSigns($heartRate: Int!, $bloodPressure: String!, $temperature: Int!) {
        addVitalSigns(heartRate: $heartRate, bloodPressure: $bloodPressure, temperature: $temperature) {
            id
            heartRate
            bloodPressure
            temperature
        }
    }
`;

const UPDATE_VITAL_SIGNS = gql`
    mutation UpdateVitalSigns($id: ID!, $heartRate: Int, $bloodPressure: String, $temperature: Int) {
        updateVitalSigns(id: $id, heartRate: $heartRate, bloodPressure: $bloodPressure, temperature: $temperature) {
            id
            heartRate
            bloodPressure
            temperature
        }
    }
`;

const VitalSignsComponent = () => {
    const { loading, error, data, refetch } = useQuery(GET_VITAL_SIGNS);
    const [addVitalSigns] = useMutation(ADD_VITAL_SIGNS);
    const [updateVitalSigns] = useMutation(UPDATE_VITAL_SIGNS, {
        refetchQueries: [{ query: GET_VITAL_SIGNS }],
    });

    const [form, setForm] = useState({ id: "", heartRate: "", bloodPressure: "", temperature: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields
        if (!form.heartRate || !form.bloodPressure || !form.temperature) {
            alert("All fields are required");
            return;
        }

        if (form.id) {
            // If there's an id in the form, it means we're updating an existing entry
            await updateVitalSigns({
                variables: {
                    id: form.id,
                    heartRate: parseInt(form.heartRate),
                    bloodPressure: form.bloodPressure,
                    temperature: parseInt(form.temperature),
                },
            });
        } else {
            // If there's no id, it's a new entry
            await addVitalSigns({
                variables: {
                    heartRate: parseInt(form.heartRate),
                    bloodPressure: form.bloodPressure,
                    temperature: parseInt(form.temperature),
                },
            });
        }

        // Clear form after submission
        setForm({ id: "", heartRate: "", bloodPressure: "", temperature: "" });

        await refetch(); // Refetch the data to reflect changes
    };

    const handleEdit = (vs) => {
        // Populate the form with the data of the selected vital signs
        setForm({
            id: vs.id,
            heartRate: vs.heartRate,
            bloodPressure: vs.bloodPressure,
            temperature: vs.temperature,
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p> {error.message}</p>;

    return (
        <div>
            <h2>Add New Vital Sign</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    name="heartRate"
                    placeholder="Heart Rate"
                    value={form.heartRate}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="bloodPressure"
                    placeholder="Blood Pressure"
                    value={form.bloodPressure}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="temperature"
                    placeholder="Temperature"
                    value={form.temperature}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{form.id ? "Update" : "Add"} Vital Signs</button>
            </form>
            <h2>Vital Signs List</h2>
            <ul>
                {data.vitalSigns.map((vs) => (
                    <li key={vs.id}>
                        <p>Heart Rate: {vs.heartRate}</p>
                        <p>Blood Pressure: {vs.bloodPressure}</p>
                        <p>Temperature: {vs.temperature}</p>
                        <button onClick={() => handleEdit(vs)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VitalSignsComponent;
