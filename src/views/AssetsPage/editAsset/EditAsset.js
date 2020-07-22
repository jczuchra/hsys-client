import React from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Form, Input, InputNumber } from 'antd';
import { useMutation, useQuery } from '@apollo/react-hooks';
import CreateContainer from '../../../components/CreateContainer/CreateContainer';
import { openNotification } from '../../../common/functions/openNotification';
import { GET_ASSETS, EDIT_ASSET, GET_ASSET } from '../assetSchemas';

const EditAsset = () => {
  const { formatMessage } = useIntl();
  const history = useHistory();
  const { location } = history;
  const params = new URLSearchParams(location.search);
  const assetId = params.get('id');

  const {
    loading: assetLoading,
    error: assetError,
    data: assetData,
  } = useQuery(GET_ASSET, { variables: { id: assetId } });
  console.log('AssetData', assetData);

  const getAsset = (assetData && assetData.getAsset) || {};

  const { name, quantity, description } = getAsset;

  const [editAsset, { editData, loading }] = useMutation(EDIT_ASSET, {
    onCompleted: (data) => {
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
      <Form.Item
        initialValue={name}
        name='name'
        label={formatMessage(messages.name)}
        rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={quantity}
        name='quantity'
        label={formatMessage(messages.quantity)}
        rules={[{ type: 'number', min: 0, max: 100000 }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item
        initialValue={description}
        name='description'
        label={formatMessage(messages.description)}>
        <Input.TextArea />
      </Form.Item>
    </React.Fragment>
  );
  return (
    !assetLoading && (
      <CreateContainer
        formItems={formItems}
        //These 2 below are for breadcrumb
        backTo={formatMessage(messages.backTo)}
        currentPage={formatMessage(messages.currentPage)}
        title={formatMessage(messages.currentPage)}
        onSubmit={editAsset}
        id={assetId}
      />
    )
  );
};

export default EditAsset;

const messages = defineMessages({
  backTo: {
    id: 'client.src.views.AssetsPage.editAsset.backTo',
    defaultMessage: 'Assets',
  },
  currentPage: {
    id: 'client.src.views.AssetsPage.editAsset.currentPage',
    defaultMessage: 'Edit asset',
  },
  save: {
    id: 'client.src.views.AssetsPage.editAsset.create',
    defaultMessage: 'Save',
  },
  edit: {
    id: 'client.src.views.AssetsPage.editAsset.edit',
    defaultMessage: 'Edit',
  },
  quantity: {
    id: 'client.src.views.AssetsPage.editAsset.quantity',
    defaultMessage: 'Quantity',
  },
  description: {
    id: 'client.src.views.AssetsPage.editAsset.description',
    defaultMessage: 'Description',
  },
  name: {
    id: 'client.src.views.AssetsPage.editAsset.name',
    defaultMessage: 'Name',
  },
});
