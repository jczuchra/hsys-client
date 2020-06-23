import React from 'react';
import { Button } from 'antd';
import { defineMessages } from 'react-intl';
import DeviceMenu from '../DevicesPage/deviceMenu/DeviceMenu';
import DeviceCategoriesMenu from './deviceCategoriesMenu/deviceCategoriesMenu';

export const messages = defineMessages({
  title: {
    id: 'client.src.views.devicesPage.devicesData.title',
    defaultMessage: 'Device categories',
  },
  count: {
    id: 'client.src.views.devicesPage.devicesData.count',
    defaultMessage: 'Count: {count}',
  },
  create: {
    id: 'client.src.views.devicesPage.devicesData.create',
    defaultMessage: 'Add',
  },
  category: {
    id: 'client.src.views.devicesPage.devicesData.createCategory',
    defaultMessage: 'Add device',
  },
  device: {
    id: 'client.src.views.devicesPage.devicesData.createDevice',
    defaultMessage: 'Add device category',
  },
  categories: {
    id: 'client.src.views.devicesPage.devicesData.categories',
    defaultMessage: 'Categories',
  },
});

export const columns = (history) => [
  {
    title: 'Name',
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
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    width: '20%',
  },
  {
    title: 'Description',
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

export const detailsColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
    width: '20%',
  },
  {
    title: 'Production Date',
    dataIndex: 'productionDate',
    width: '20%',
    key: 'productionDate',
  },
  {
    title: 'Last maintenance',
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
