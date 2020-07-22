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
  GET_DEVICE,
} from '../devicesSchemas';
import moment from 'moment';
import styles from './editDevice.module.scss';

const EditDevice = ({ value = {}, onChange }) => {
  const { formatMessage } = useIntl();
  const history = useHistory();
  const config = {
    rules: [
      {
        type: 'object',
        required: false,
        message: formatMessage(messages.selectTime),
      },
    ],
  };
  const [category, setCategory] = useState();
  const { location } = history;
  const params = new URLSearchParams(location.search);
  const deviceId = params.get('id');

  const { Option } = Select;

  const {
    loading: deviceLoading,
    error: deviceError,
    data: deviceData,
  } = useQuery(GET_DEVICE, { variables: { id: deviceId } });

  const getDevice = (deviceData && deviceData.getDevice) || {};
  const {
    name,
    lastMaintenance,
    productionDate,
    location: deviceLocation,
  } = getDevice;
  const [
    editDevice,
    { data, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDIT_DEVICE, {
    onCompleted: (data) => {
      openNotification(
        formatMessage(messages.editCategory),
        data.editDevice.message,
        'success'
      );
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
      <Form.Item
        initialValue={name}
        name='name'
        label={formatMessage(messages.name)}
        rules={[{ required: false }]}>
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={moment(productionDate)}
        name='productionDate'
        label={formatMessage(messages.productionDate)}
        {...config}>
        <DatePicker />
      </Form.Item>
      <Form.Item
        initialValue={moment(lastMaintenance)}
        name='lastMaintenance'
        label={formatMessage(messages.lastMaintenance)}
        {...config}>
        <DatePicker />
      </Form.Item>
      <Form.Item
        name='location'
        label={formatMessage(messages.location)}
        initialValue={deviceLocation}
        rules={[{ required: false, type: 'number' }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item
        name='categoryId'
        label={formatMessage(messages.category)}
        rules={[{ required: false }]}>
        <Select
          disabled
          defaultValue={formatMessage(messages.selectCategory)}
          className={styles.select}
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
    !deviceLoading && (
      <CreateContainer
        formItems={formItems}
        //These 2 below are for breadcrumb
        backTo={formatMessage(messages.backTo)}
        currentPage={formatMessage(messages.currentPage)}
        title={formatMessage(messages.currentPage)}
        onSubmit={editDevice}
        id={deviceId}
      />
    )
  );
};

export default EditDevice;

const messages = defineMessages({
  backTo: {
    id: 'client.src.views.devicesPage.editDevice.backTo',
    defaultMessage: 'Devices',
  },
  currentPage: {
    id: 'client.src.views.devicesPage.editDevice.currentPage',
    defaultMessage: 'Edit device',
  },
  save: {
    id: 'client.src.views.devicesPage.editDevice.create',
    defaultMessage: 'Save',
  },
  selectTime: {
    id: 'client.src.views.devicesPage.editDevice.selectTime',
    defaultMessage: 'Please select time!',
  },
  name: {
    id: 'client.src.views.devicesPage.editDevice.name',
    defaultMessage: 'Name',
  },
  location: {
    id: 'client.src.views.devicesPage.editDevice.location',
    defaultMessage: 'Location',
  },
  productionDate: {
    id: 'client.src.views.devicesPage.editDevice.productionDate',
    defaultMessage: 'Production date',
  },
  lastMaintenance: {
    id: 'client.src.views.devicesPage.editDevice.lastMaintenance',
    defaultMessage: 'Last maintenance',
  },
  category: {
    id: 'client.src.views.devicesPage.editDevice.category',
    defaultMessage: 'Category',
  },
  selectCategory: {
    id: 'client.src.views.devicesPage.editDevice.selectCategory',
    defaultMessage: 'Select category',
  },
  editCategory: {
    id: 'client.src.views.devicesPage.editDevice.editCategory',
    defaultMessage: 'Edit category',
  },
});
