import React, { useState } from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Form, Input, Select, Modal } from 'antd';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import CreateContainer from '../../../components/CreateContainer/CreateContainer';
import { openNotification } from '../../../common/functions/openNotification';
import { ADD_DEVICE_CATEGORY } from '../devicesSchemas';
import { GET_CATEGORIES } from '../../DeviceCategoriesPage/categoriesSchemas';
// import styles from './addDevice.module.scss';

const config = {
  rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};

const AddDeviceCategory = ({ visible, setVisible, onCancel }) => {
  const { formatMessage } = useIntl();
  const history = useHistory();
  const [category, setCategory] = useState();
  const [form] = Form.useForm();

  const { Option } = Select;

  const [
    addDeviceCategory,
    { data, loading: mutationLoading, error: mutationError },
  ] = useMutation(ADD_DEVICE_CATEGORY, {
    onCompleted: (data) => {
      console.log('Data', data);
      openNotification(
        'Add device category',
        data.createDeviceCategory.message,
        'success'
      );
    },
    update: (cache, { data: { createDeviceCategory } }) => {
      const { allDeviceCategories } = cache.readQuery({
        query: GET_CATEGORIES,
      });
      console.log('Result', allDeviceCategories, createDeviceCategory);
      cache.writeQuery({
        query: GET_CATEGORIES,
        data: {
          allDeviceCategories: {
            allElements: allDeviceCategories.allElements.concat([
              createDeviceCategory.asset,
            ]),
            count: allDeviceCategories.count + 1,
          },
        },
      });
    },
  });

  return (
    <Modal
      visible={visible}
      title={formatMessage(messages.title)}
      okText={formatMessage(messages.create)}
      cancelText={formatMessage(messages.cancel)}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            addDeviceCategory({ variables: { ...values } });
            setVisible(false);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}>
      <Form
        form={form}
        layout='vertical'
        name='form_in_modal'
        initialValues={{ modifier: 'public' }}>
        <Form.Item
          name='name'
          label={formatMessage(messages.name)}
          rules={[
            {
              required: true,
              message: formatMessage(messages.inputTitle),
            },
          ]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddDeviceCategory;

const messages = defineMessages({
  title: {
    id: 'client.src.views.DevicessPage.AddDeviceCategory.title',
    defaultMessage: 'Create new device category',
  },
  categoryName: {
    id: 'client.src.views.DevicessPage.AddDeviceCategory.categoryName',
    defaultMessage: 'Category name',
  },
  create: {
    id: 'client.src.views.DevicessPage.AddDeviceCategory.create',
    defaultMessage: 'Create',
  },
  cancel: {
    id: 'client.src.views.DevicessPage.AddDeviceCategory.cancel',
    defaultMessage: 'Cancel',
  },
  inputTitle: {
    id: 'client.src.views.DevicessPage.AddDeviceCategory.inputTitle',
    defaultMessage: 'Please input category name!',
  },
  name: {
    id: 'client.src.views.DevicessPage.AddDeviceCategory.name',
    defaultMessage: 'Name',
  },
});
