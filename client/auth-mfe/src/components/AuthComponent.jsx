import React, { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import "../styles/Auth.css"

const LOGIN_MUTATION = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            success
            message
            token
        }
    }
`;

const REGISTER_MUTATION = gql`
    mutation Register($username: String!, $password: String!) {
        register(username: $username, password: $password) {
            success
            message
            token
        }
    }
`;

const LOGOUT_MUTATION = gql`
    mutation {
        logout
    }
`;

const CURRENT_USER_QUERY = gql`
    query {
        currentUser {
            id
            username
        }
    }
`;

const AuthComponent = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    // graphql req
    const { data, refetch } = useQuery(CURRENT_USER_QUERY);
    const [login] = useMutation(LOGIN_MUTATION);
    const [register] = useMutation(REGISTER_MUTATION);
    const [logout] = useMutation(LOGOUT_MUTATION);

    useEffect(() => {
        refetch();
    }, [refetch]);

    const handleLogin = async () => {
        try {
            const { data } = await login({ variables: { username, password } });
            if (data.login.success) {
                setMessage("Login successful!");
                refetch(); // Refresh
            } else {
                setError(data.login.message);
            }
        } catch (err) {
            setError("Login failed.");
        }
    };

    const handleRegister = async () => {
        try {
            const { data } = await register({ variables: { username, password } });
            if (data.register.success) {
                setMessage("Registration successful! You can now log in.");
            } else {
                setError(data.register.message);
            }
        } catch (err) {
            setError("Registration failed :(");
        }
    };

    const handleLogout = async () => {
        await logout();
        setMessage("Logged out.");
        await refetch();
    };

    return (
        <div>
            {data?.currentUser ? (
                <div>
                    <h2>Welcome, {data.currentUser.username}!</h2>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <h2>Authentication</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Login</button>
                    <button onClick={handleRegister}>Register</button>
                </div>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {message && <p style={{ color: "green" }}>{message}</p>}
        </div>
    );
};

export default AuthComponent;
