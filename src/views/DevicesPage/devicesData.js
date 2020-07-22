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
  name: {
    id: 'client.src.views.devicesPage.devicesData.name',
    defaultMessage: 'Name',
  },
  location: {
    id: 'client.src.views.devicesPage.devicesData.location',
    defaultMessage: 'Location',
  },
  productionDate: {
    id: 'client.src.views.devicesPage.devicesData.productionDate',
    defaultMessage: 'Production date',
  },
  lastMaintenance: {
    id: 'client.src.views.devicesPage.devicesData.lastMaintenance',
    defaultMessage: 'Last maintenance',
  },
});

export const columns = (formatMessage) => [
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
