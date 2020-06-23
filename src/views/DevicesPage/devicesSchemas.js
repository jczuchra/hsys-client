import gql from 'graphql-tag';

export const GET_ALL_DEVICES = gql`
  query GetAllDevices {
    allDevices {
      allElements {
        id
        name
        location
        productionDate
        lastMaintenance
        categoryId
      }
      count
    }
  }
`;

export const ADD_DEVICE = gql`
  mutation addDevice(
    $name: String!
    $location: Int!
    $productionDate: String!
    $lastMaintenance: String!
    $categoryId: String!
  ) {
    addDevice(
      name: $name
      location: $location
      productionDate: $productionDate
      lastMaintenance: $lastMaintenance
      categoryId: $categoryId
    ) {
      message
      success
      asset {
        name
        location
        productionDate
        lastMaintenance
        categoryId
      }
    }
  }
`;

export const DELETE_DEVICE = gql`
  mutation deleteDevice($id: ID!) {
    deleteDevice(id: $id) {
      message
      success
      error
    }
  }
`;

export const EDIT_DEVICE = gql`
  mutation editDevice(
    $id: ID!
    $name: String
    $location: Int
    $productionDate: String
    $lastMaintenance: String
    $categoryId: String
  ) {
    editDevice(
      id: $id
      name: $name
      location: $location
      productionDate: $productionDate
      lastMaintenance: $lastMaintenance
      categoryId: $categoryId
    ) {
      message
      success
      error
    }
  }
`;

export const GET_CATEGORIES = gql`
  query allDeviceCategories {
    allDeviceCategories {
      allElements {
        id
        name
        quantity
      }
      info {
        success
        message
      }
    }
  }
`;

export const ADD_DEVICE_CATEGORY = gql`
  mutation CreateCategory($name: String) {
    createDeviceCategory(name: $name) {
      message
      success
      asset {
        name
        quantity
        description
      }
    }
  }
`;
