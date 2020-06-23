import React, { useState } from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Form, Input, InputNumber, DatePicker, Select } from 'antd';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import CreateContainer from '../../../components/CreateContainer/CreateContainer';
import { openNotification } from '../../../common/functions/openNotification';
import { ADD_DEVICE, GET_CATEGORIES, GET_ALL_DEVICES } from '../devicesSchemas';
import styles from './addDevice.module.scss';

const config = {
  rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};

const AddDevice = ({ value = {}, onChange }) => {
  const { formatMessage } = useIntl();
  const history = useHistory();
  const [category, setCategory] = useState();

  const { Option } = Select;

  const [
    addDevice,
    { data, loading: mutationLoading, error: mutationError },
  ] = useMutation(ADD_DEVICE, {
    onCompleted: (data) => {
      console.log('Data', data);
      openNotification('Add device', data.addDevice.message, 'success');
      history.push('/devices');
    },
    update: (cache, { data: { addDevice } }) => {
      const { allDevices } = cache.readQuery({ query: GET_ALL_DEVICES });
      cache.writeQuery({
        query: GET_ALL_DEVICES,
        data: {
          allDevices: {
            allElements: allDevices.allElements.concat([addDevice.asset]),
            count: allDevices.count + 1,
          },
        },
      });
    },
  });

  const {
    loading: categoryLoading,
    error: categoryError,
    data: categoryData,
  } = useQuery(GET_CATEGORIES);

  const formItems = (
    <React.Fragment>
      <Form.Item name='name' label='Name' rules={[{ required: true }]}>
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
        rules={[{ required: true, type: 'number' }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item
        name='categoryId'
        label='Category'
        rules={[{ required: true }]}>
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
      onSubmit={addDevice}
    />
  );
};

export default AddDevice;

const messages = defineMessages({
  backTo: {
    id: 'client.src.views.AssetsPage.createAsset.backTo',
    defaultMessage: 'Devices',
  },
  currentPage: {
    id: 'client.src.views.AssetsPage.createAsset.currentPage',
    defaultMessage: 'Add device',
  },
  save: {
    id: 'client.src.components.createContainer.create',
    defaultMessage: 'Save',
  },
});
