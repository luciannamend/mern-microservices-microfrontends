import './styles/App.css'
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import AuthComponent from './components/AuthComponent.jsx'

const client = new ApolloClient({
    uri: 'http://localhost:4001/graphql',
    cache: new InMemoryCache(),
    credentials: 'include'
});

function App() {

  return (
    <>
        <ApolloProvider client={client}>
            <AuthComponent  />
        </ApolloProvider>
    </>
  )
}

export default App
