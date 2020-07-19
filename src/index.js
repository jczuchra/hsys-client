import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { ApolloProvider } from '@apollo/react-hooks';
import { CookiesProvider } from 'react-cookie';
import { createHttpLink } from 'apollo-link-http';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { InMemoryCache } from 'apollo-cache-inmemory';
import 'antd/dist/antd.css';

const httpLink = createHttpLink({
  uri: 'https://hsys-server.herokuapp.com/graphql',
  // uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

const authLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const noAuthOperation = ['contactEmail', 'loginUser', 'registerUser'];
    console.log('Response', response);
    if (response.data && !noAuthOperation.includes(operation.operationName)) {
      const isEmpty = !Object.values(response.data).some((x) => x !== null);
      if (isEmpty) {
        document.cookie = 'loggedIn= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
        window.location = '/';
      }
    }
    return response;
  });
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    window.location = `/error?error=500&message=${graphQLErrors[0]}`;

    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }
  if (networkError) {
    window.location = `/error?error=500&message=${networkError}`;
    console.log(`[Network error]: ${networkError}`);
  }
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(errorLink.concat(httpLink)),
});

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <ApolloProvider client={client}>
        <GoogleReCaptchaProvider reCaptchaKey='6LcZ17IZAAAAAPodFHFTG0zAmOyst4zF4Nn9DoCs'>
          <App />
        </GoogleReCaptchaProvider>
      </ApolloProvider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
