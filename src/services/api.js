import { ApolloClient, InMemoryCache } from '@apollo/client';

const api = new ApolloClient({
//   uri: 'https://48p1r2roz4.sse.codesandbox.io',
  uri: 'https://countries.trevorblades.com/',
  cache: new InMemoryCache()
});

export default api;