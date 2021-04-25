import React from 'react';
import {ApolloProvider} from "@apollo/react-hooks";
import api from "./services/api";
function App() {
  return (
    <ApolloProvider client={api}>
      <div className="App">
        <h1>meu component</h1>
      </div>
    </ApolloProvider>
  );
}

export default App;
