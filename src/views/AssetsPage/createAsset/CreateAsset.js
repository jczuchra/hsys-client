import React from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Form, Input, InputNumber } from 'antd';
import { useMutation } from '@apollo/react-hooks';
import CreateContainer from '../../../components/CreateContainer/CreateContainer';
import { openNotification } from '../../../common/functions/openNotification';
import { GET_ASSETS, CREATE_ASSET } from '../assetSchemas';

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
      <Form.Item
        name='name'
        label={formatMessage(messages.name)}
        rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name='quantity'
        label={formatMessage(messages.quantity)}
        rules={[{ type: 'number', min: 0, max: 100000 }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item name='description' label={formatMessage(messages.description)}>
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
    id: 'client.src.views.AssetsPage.createAsset.save',
    defaultMessage: 'Save',
  },
  quantity: {
    id: 'client.src.views.AssetsPage.createAsset.quantity',
    defaultMessage: 'Quantity',
  },
  description: {
    id: 'client.src.views.AssetsPage.createAsset.description',
    defaultMessage: 'Description',
  },
  name: {
    id: 'client.src.views.AssetsPage.createAsset.name',
    defaultMessage: 'Name',
  },
});
