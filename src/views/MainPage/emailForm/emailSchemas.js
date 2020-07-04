import gql from 'graphql-tag';

export const CONTACT_EMAIL = gql`
  mutation contactEmail(
    $name: String!
    $email: String
    $phone: Int!
    $message: String!
  ) {
    contactEmail(name: $name, email: $email, phone: $phone, message: $message) {
      message
    }
  }
`;
