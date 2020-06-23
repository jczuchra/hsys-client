import React, { useState } from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Form, Input, InputNumber, DatePicker, Select } from 'antd';
import { useMutation, useQuery } from '@apollo/react-hooks';
import CreateContainer from '../../../components/CreateContainer/CreateContainer';
import { openNotification } from '../../../common/functions/openNotification';
import {
  EDIT_DEVICE,
  GET_CATEGORIES,
  GET_ALL_DEVICES,
} from '../devicesSchemas';
import styles from './editDevice.module.scss';

const config = {
  rules: [{ type: 'object', required: false, message: 'Please select time!' }],
};

const EditDevice = ({ value = {}, onChange }) => {
  const { formatMessage } = useIntl();
  const history = useHistory();
  const [category, setCategory] = useState();
  const { location } = history;
  const params = new URLSearchParams(location.search);
  const deviceId = params.get('id');

  const { Option } = Select;

  const [
    editDevice,
    { data, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDIT_DEVICE, {
    onCompleted: (data) => {
      openNotification('Edit device', data.editDevice.message, 'success');
      history.push('/devices');
    },
    update: (cache, { data: { editDevice } }) => {
      const { allDevices } = cache.readQuery({ query: GET_ALL_DEVICES });
      let deviceIndex;
      const editedDevice = allDevices.allElements.find((el, index) => {
        if (el.id === deviceId) {
          deviceIndex = index;
          return el;
        }
        return false;
      });

      allDevices.allElements[deviceIndex] = editDevice.asset;
    },
  });

  const {
    loading: categoryLoading,
    error: categoryError,
    data: categoryData,
  } = useQuery(GET_CATEGORIES);

  const formItems = (
    <React.Fragment>
      <Form.Item name='name' label='Name' rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item name='productionDate' label='Production date' {...config}>
        <DatePicker />
      </Form.Item>
      <Form.Item name='lastMaintenance' label='Last maintenance' {...config}>
        <DatePicker />
      </Form.Item>
      <Form.Item
        name='location'
        label='Location'
        rules={[{ required: false, type: 'number' }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item
        name='categoryId'
        label='Category'
        rules={[{ required: false }]}>
        <Select
          defaultValue='Select category'
          className={styles.select}
          disabled={
            categoryData && !categoryData.allDeviceCategories.allElements.length
          }
          value={category}
          onChange={(newCategory) => setCategory(newCategory)}>
          {categoryData &&
            categoryData.allDeviceCategories.allElements.map((cat) => (
              <Option value={cat.id}>{cat.name}</Option>
            ))}
        </Select>
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
      onSubmit={editDevice}
      id={deviceId}
    />
  );
};

export default EditDevice;

const messages = defineMessages({
  backTo: {
    id: 'client.src.views.AssetsPage.createAsset.backTo',
    defaultMessage: 'Devices',
  },
  currentPage: {
    id: 'client.src.views.AssetsPage.createAsset.currentPage',
    defaultMessage: 'Edit device',
  },
  save: {
    id: 'client.src.components.createContainer.create',
    defaultMessage: 'Save',
  },
});
