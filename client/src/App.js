import React from 'react';
import BookList from './components/BookList';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Apollo Client Setup
const client = new ApolloClient({
  // same as the GraphQl server URI set in the backend
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Kakos Ninja</h1>
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
