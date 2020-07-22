import React, { useState } from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Form, Input, Select, Modal } from 'antd';
import { useMutation } from '@apollo/react-hooks';
import { openNotification } from '../../../common/functions/openNotification';
import { ADD_DEVICE_CATEGORY } from '../devicesSchemas';
import { GET_CATEGORIES } from '../../DeviceCategoriesPage/categoriesSchemas';

const AddDeviceCategory = ({ visible, setVisible, onCancel }) => {
  const { formatMessage } = useIntl();
  const config = {
    rules: [
      {
        type: 'object',
        required: true,
        message: formatMessage(messages.selectTime),
      },
    ],
  };
  const history = useHistory();
  const [category, setCategory] = useState();
  const [form] = Form.useForm();

  const { Option } = Select;

  const [
    addDeviceCategory,
    { data, loading: mutationLoading, error: mutationError },
  ] = useMutation(ADD_DEVICE_CATEGORY, {
    onCompleted: (data) => {
      openNotification(
        formatMessage(messages.addDeviceCategory),
        data.createDeviceCategory.message,
        'success'
      );
    },
    update: (cache, { data: { createDeviceCategory } }) => {
      const { allDeviceCategories } = cache.readQuery({
        query: GET_CATEGORIES,
      });
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
    id: 'client.src.views.devicessPage.addDeviceCategory.title',
    defaultMessage: 'Create new device category',
  },
  categoryName: {
    id: 'client.src.views.devicessPage.addDeviceCategory.categoryName',
    defaultMessage: 'Category name',
  },
  create: {
    id: 'client.src.views.devicessPage.addDeviceCategory.create',
    defaultMessage: 'Create',
  },
  cancel: {
    id: 'client.src.views.devicessPage.addDeviceCategory.cancel',
    defaultMessage: 'Cancel',
  },
  inputTitle: {
    id: 'client.src.views.devicessPage.addDeviceCategory.inputTitle',
    defaultMessage: 'Please input category name!',
  },
  name: {
    id: 'client.src.views.devicessPage.addDeviceCategory.name',
    defaultMessage: 'Name',
  },
  addDeviceCategory: {
    id: 'client.src.views.devicessPage.addDeviceCategory.addDeviceCategory',
    defaultMessage: 'Add device category',
  },
  selectTime: {
    id: 'client.src.views.devicessPage.addDeviceCategory.selectTime',
    defaultMessage: 'Please select time!',
  },
});
