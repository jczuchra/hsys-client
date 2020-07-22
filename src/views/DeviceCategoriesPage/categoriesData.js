import React from 'react';
import { Button } from 'antd';
import { defineMessages } from 'react-intl';
import DeviceMenu from '../DevicesPage/deviceMenu/DeviceMenu';
import DeviceCategoriesMenu from './deviceCategoriesMenu/deviceCategoriesMenu';

export const messages = defineMessages({
  title: {
    id: 'client.src.views.deviceCategoriesPage.categoriesData.title',
    defaultMessage: 'Device categories',
  },
  count: {
    id: 'client.src.views.deviceCategoriesPage.categoriesData.count',
    defaultMessage: 'Count: {count}',
  },
  create: {
    id: 'client.src.views.deviceCategoriesPage.categoriesData.create',
    defaultMessage: 'Add',
  },
  category: {
    id: 'client.src.views.deviceCategoriesPage.categoriesData.createCategory',
    defaultMessage: 'Add device',
  },
  device: {
    id: 'client.src.views.deviceCategoriesPage.categoriesData.createDevice',
    defaultMessage: 'Add device category',
  },
  categories: {
    id: 'client.src.views.deviceCategoriesPage.categoriesData.categories',
    defaultMessage: 'Categories',
  },
  name: {
    id: 'client.src.views.deviceCategoriesPage.categoriesData.name',
    defaultMessage: 'Name',
  },
  location: {
    id: 'client.src.views.deviceCategoriesPage.categoriesData.location',
    defaultMessage: 'Location',
  },
  productionDate: {
    id: 'client.src.views.deviceCategoriesPage.categoriesData.productionDate',
    defaultMessage: 'Production date',
  },
  lastMaintenance: {
    id: 'client.src.views.deviceCategoriesPage.categoriesData.lastMaintenance',
    defaultMessage: 'Last maintenance',
  },
  quantity: {
    id: 'client.src.views.deviceCategoriesPage.categoriesData.quantity',
    defaultMessage: 'Quantity',
  },
  description: {
    id: 'client.src.views.deviceCategoriesPage.categoriesData.description',
    defaultMessage: 'Description',
  },
});

export const columns = (history, formatMessage) => [
  {
    title: formatMessage(messages.name),
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
      <Button
        type='link'
        onClick={() =>
          history.push(`/categoryDetails?id=${record.id}&name=${record.name}`)
        }>
        {text}
      </Button>
    ),
  },
  {
    title: formatMessage(messages.quantity),
    dataIndex: 'quantity',
    key: 'quantity',
    width: '20%',
  },
  {
    title: formatMessage(messages.description),
    dataIndex: 'description',
    width: '40%',
    key: 'description',
  },
  {
    title: '',
    key: 'action',
    width: '10%',
    render: (text, record) => <DeviceCategoriesMenu record={record} />,
  },
];

export const detailsColumns = (formatMessage) => [
  {
    title: formatMessage(messages.name),
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: formatMessage(messages.location),
    dataIndex: 'location',
    key: 'location',
    width: '20%',
  },
  {
    title: formatMessage(messages.productionDate),
    dataIndex: 'productionDate',
    width: '20%',
    key: 'productionDate',
  },
  {
    title: formatMessage(messages.lastMaintenance),
    dataIndex: 'lastMaintenance',
    width: '20%',
    key: 'lastMaintenance',
  },
  {
    title: '',
    key: 'action',
    width: '10%',
    render: (text, record) => <DeviceMenu record={record} />,
  },
];
