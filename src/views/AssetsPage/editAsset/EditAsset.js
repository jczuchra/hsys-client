import React from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Button, Typography, Breadcrumb, Form, Input, InputNumber } from 'antd';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import CreateContainer from '../../../components/CreateContainer/CreateContainer';
import { openNotification } from '../../../common/functions/openNotification';
import { GET_ASSETS, EDIT_ASSET } from '../assetSchemas';

const EditAsset = () => {
  const { formatMessage } = useIntl();
  const history = useHistory();
  const { location } = history;
  const params = new URLSearchParams(location.search);
  const assetId = params.get('id');
  const [editAsset, { editData, loading }] = useMutation(EDIT_ASSET, {
    onCompleted: (data) => {
      console.log('Kapota', data.editAsset);
      openNotification(
        formatMessage(messages.edit),
        data.editAsset.message,
        'success'
      );
      history.goBack();
    },
    update: (cache, { data: { editAsset } }) => {
      const { allAssets } = cache.readQuery({ query: GET_ASSETS });
      let assetIndex;
      const editedAsset = allAssets.allElements.find((el, index) => {
        if (el.id === assetId) {
          assetIndex = index;
          return el;
        }
        return false;
      });

      allAssets.allElements[assetIndex] = editAsset.asset;
    },
  });
  const formItems = (
    <React.Fragment>
      <Form.Item name='name' label='Name' rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name='quantity'
        label='Quantity'
        rules={[{ type: 'number', min: 0, max: 100000 }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item name='description' label='Description'>
        <Input.TextArea />
      </Form.Item>
    </React.Fragment>
  );
  return (
    <CreateContainer
      formItems={formItems}
      //These 2 below are for breadcrumb
      backTo={formatMessage(messages.backTo)}
      currentPage={formatMessage(messages.currentPage)}
      title={formatMessage(messages.currentPage)}
      onSubmit={editAsset}
      id={assetId}
    />
  );
};

export default EditAsset;

const messages = defineMessages({
  backTo: {
    id: 'client.src.views.AssetsPage.createAsset.backTo',
    defaultMessage: 'Assets',
  },
  currentPage: {
    id: 'client.src.views.AssetsPage.createAsset.currentPage',
    defaultMessage: 'Edit asset',
  },
  save: {
    id: 'client.src.components.createContainer.create',
    defaultMessage: 'Save',
  },
  edit: {
    id: 'client.src.views.AssetsPage.editAsset.edit',
    defaultMessage: 'Edit',
  },
});
