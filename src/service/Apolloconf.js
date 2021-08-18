import {
    ApolloClient
} from 'apollo-client';
import {
    createHttpLink
} from 'apollo-link-http';
import {
    InMemoryCache
} from 'apollo-cache-inmemory';


const getHeaders = () => {
    const headers = {};
    const token = localStorage.getItem('accessToken');

    if (token) {
        headers.authorization = token;
    }
    return headers;
};

const httpLink = createHttpLink({
    uri: 'http://localhost:3001/auth',
    fetch,
    headers: getHeaders()
})

const cache = new InMemoryCache({
    addTypename: true
});

const apolloClient = new ApolloClient({
    link: httpLink,
    connectToDevTools: true,
    cache,
});

export default apolloClient;