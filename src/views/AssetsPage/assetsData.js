import React from 'react';
import { defineMessages } from 'react-intl';
import AssetMenu from './assetMenu/AssetMenu';

export const messages = defineMessages({
  title: {
    id: 'client.src.views.assetsPage.assetsData.title',
    defaultMessage: 'Assets',
  },
  count: {
    id: 'client.src.views.assetsPage.assetsData.count',
    defaultMessage: 'Count: {count}',
  },
  create: {
    id: 'client.src.views.assetsPage.assetsData.create',
    defaultMessage: 'Create asset',
  },
  quantity: {
    id: 'client.src.views.assetsPage.assetsData..quantity',
    defaultMessage: 'Quantity',
  },
  description: {
    id: 'client.src.views.assetsPage.assetsData.description',
    defaultMessage: 'Description',
  },
  name: {
    id: 'client.src.views.assetsPage.assetsData.name',
    defaultMessage: 'Name',
  },
});

export const columns = (formatMessage) => [
  {
    title: formatMessage(messages.name),
    dataIndex: 'name',
    key: 'name',
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
    width: '35%',
    key: 'description',
  },
  {
    title: '',
    key: 'action',
    width: '10%',
    render: (text, record) => <AssetMenu record={record} />,
  },
];
