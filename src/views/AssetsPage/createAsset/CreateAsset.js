import React from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Button, Typography, Breadcrumb, Form, Input, InputNumber } from 'antd';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import CreateContainer from '../../../components/CreateContainer/CreateContainer';
import { openNotification } from '../../../common/functions/openNotification';
import { GET_ASSETS } from '../assetSchemas';

const CREATE_ASSET = gql`
  mutation createAsset($name: String!, $description: String, $quantity: Int!) {
    addAsset(name: $name, description: $description, quantity: $quantity) {
      message
      asset {
        id
        name
        quantity
        description
      }
    }
  }
`;

const CreateAsset = () => {
  const { formatMessage } = useIntl();
  const history = useHistory();
  const [
    createAsset,
    { data, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_ASSET, {
    onCompleted: (data) => {
      openNotification('Add asset', data.addAsset.message, 'success');
      history.push('/assets');
    },
    update: (cache, { data: { addAsset } }) => {
      const { allAssets } = cache.readQuery({ query: GET_ASSETS });
      cache.writeQuery({
        query: GET_ASSETS,
        data: {
          allAssets: {
            allElements: allAssets.allElements.concat([addAsset.asset]),
            count: allAssets.count + 1,
          },
        },
      });
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
      onSubmit={createAsset}
    />
  );
};

export default CreateAsset;

const messages = defineMessages({
  backTo: {
    id: 'client.src.views.AssetsPage.createAsset.backTo',
    defaultMessage: 'Assets',
  },
  currentPage: {
    id: 'client.src.views.AssetsPage.createAsset.currentPage',
    defaultMessage: 'Create asset',
  },
  save: {
    id: 'client.src.components.createContainer.create',
    defaultMessage: 'Save',
  },
});
