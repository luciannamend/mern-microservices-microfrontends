import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css'
import App from './App.jsx'
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client";

const httpLink = createHttpLink({
    uri: 'http://localhost:4001/graphql',
    credentials: 'include',
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
);