import gql from 'graphql-tag';

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
      count
    }
  }
`;

export const ADD_DEVICE_CATEGORY = gql`
  mutation createCategory($name: String) {
    createDeviceCategory(name: $name) {
      message
      success
    }
  }
`;

export const DELETE_DEVICE_CATEGORY = gql`
  mutation deleteDeviceCategory($id: ID!) {
    deleteDeviceCategory(id: $id) {
      message
    }
  }
`;

export const DEVICES_BY_CATEGORY = gql`
  query getDevices($categoryId: ID!) {
    allDevicesByCategory(categoryId: $categoryId) {
      allElements {
        name
        location
        productionDate
        lastMaintenance
      }
      count
    }
  }
`;
