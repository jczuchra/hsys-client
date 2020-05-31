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
});

export const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
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
