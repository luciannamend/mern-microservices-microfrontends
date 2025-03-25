import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './styles/App.css'
import VitalSignsComponent from "./components/VitalSignsComponent.jsx";

const client = new ApolloClient({
  uri: 'http://localhost:4002/graphql',
  cache: new InMemoryCache(),
  credentials: 'include'
});

function App() {

  return (
    <>
      <ApolloProvider client={client}>
        <VitalSignsComponent />
      </ApolloProvider>
    </>
  )
}

export default App
