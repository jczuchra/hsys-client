import React, { useState } from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Form, Input, InputNumber, DatePicker, Select } from 'antd';
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
      openNotification(
        formatMessage(messages.addDevice),
        data.addDevice.message,
        'success'
      );
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
      <Form.Item
        name='name'
        label={formatMessage(messages.name)}
        rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name='productionDate'
        label={formatMessage(messages.productionDate)}
        {...config}>
        <DatePicker />
      </Form.Item>
      <Form.Item
        name='lastMaintenance'
        label={formatMessage(messages.lastMaintenance)}
        {...config}>
        <DatePicker />
      </Form.Item>
      <Form.Item
        name='location'
        label={formatMessage(messages.location)}
        rules={[{ required: true, type: 'number' }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item
        name='categoryId'
        label={formatMessage(messages.category)}
        rules={[{ required: true }]}>
        <Select
          defaultValue={formatMessage(messages.selectCategory)}
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
    id: 'client.src.views.devicesPage.addDevice.backTo',
    defaultMessage: 'Devices',
  },
  currentPage: {
    id: 'client.src.views.devicesPage.addDevice.currentPage',
    defaultMessage: 'Add device',
  },
  save: {
    id: 'client.src.views.devicesPage.addDevice.create',
    defaultMessage: 'Save',
  },
  name: {
    id: 'client.src.views.devicesPage.addDevice.name',
    defaultMessage: 'Name',
  },
  location: {
    id: 'client.src.views.devicesPage.addDevice.location',
    defaultMessage: 'Location',
  },
  productionDate: {
    id: 'client.src.views.devicesPage.addDevice.productionDate',
    defaultMessage: 'Production date',
  },
  lastMaintenance: {
    id: 'client.src.views.devicesPage.addDevice.lastMaintenance',
    defaultMessage: 'Last maintenance',
  },
  category: {
    id: 'client.src.views.devicesPage.addDevice.category',
    defaultMessage: 'Category',
  },
  selectCategory: {
    id: 'client.src.views.devicesPage.addDevice.selectCategory',
    defaultMessage: 'Select category',
  },
  addDevice: {
    id: 'client.src.views.devicesPage.addDevice.addDevice',
    defaultMessage: 'Add device',
  },
});
