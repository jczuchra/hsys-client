import gql from 'graphql-tag';

export const CREATE_USER = gql`
  mutation registerUser($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      status
      message
    }
  }
`;
