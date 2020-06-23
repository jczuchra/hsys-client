import React from 'react';
import { defineMessages } from 'react-intl';
import DeviceMenu from './deviceMenu/DeviceMenu';

export const messages = defineMessages({
  title: {
    id: 'client.src.views.devicesPage.devicesData.title',
    defaultMessage: 'Devices',
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
});

export const columns = [
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
