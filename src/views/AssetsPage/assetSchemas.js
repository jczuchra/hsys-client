import gql from 'graphql-tag';

export const GET_ASSETS = gql`
  query GetAllAssets {
    allAssets {
      allElements {
        id
        name
        quantity
        description
      }
      count
    }
  }
`;

export const DELETE_ASSET = gql`
  mutation deleteAsset($id: ID) {
    deleteAsset(id: $id) {
      message
      success
      error
    }
  }
`;

export const EDIT_ASSET = gql`
  mutation editAsset(
    $id: ID!
    $name: String
    $quantity: Int
    $description: String
  ) {
    editAsset(
      id: $id
      name: $name
      quantity: $quantity
      description: $description
    ) {
      message
      success
      asset {
        id
        name
        description
        quantity
      }
      error
    }
  }
`;
