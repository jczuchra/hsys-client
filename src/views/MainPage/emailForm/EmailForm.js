import React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import { useMutation } from '@apollo/react-hooks';
import { CONTACT_EMAIL } from './emailSchemas';
import { openNotification } from '../../../common/functions/openNotification/openNotification';

import styles from './emailForm.module.scss';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 5 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const EmailForm = () => {
  const [
    contactEmail,
    { data, loading: mutationLoading, error: mutationError },
  ] = useMutation(CONTACT_EMAIL, {
    onCompleted: (data) => {
      openNotification('Add asset', data.contactEmail.message, 'success');
    },
  });

  const onFinish = (values) => {
    contactEmail({ variables: { ...values } });
  };

  return (
    <div className={styles.emailContainer}>
      <Form
        className={styles.formContainer}
        name='nest-messages'
        onFinish={onFinish}
        validateMessages={validateMessages}>
        <Form.Item
          wrapperCol={{ ...layout.wrapperCol, offset: 6 }}
          className={styles.titleContainer}>
          <h3 className={styles.subTitle}>Do you have any questions?</h3>
          <h1 className={styles.title}>Contact us!</h1>
        </Form.Item>
        <Form.Item
          name='name'
          rules={[{ required: true }]}
          wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
          <Input placeholder='Name' />
        </Form.Item>
        <Form.Item
          name='email'
          rules={[{ type: 'email' }]}
          wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
          <Input placeholder='Email' />
        </Form.Item>
        <Form.Item
          name='phone'
          rules={[{ type: 'number' }]}
          wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
          <InputNumber placeholder='Phone number' />
        </Form.Item>
        <Form.Item
          name='message'
          wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
          <Input.TextArea placeholder='Message' />
        </Form.Item>
        <Form.Item
          wrapperCol={{ ...layout.wrapperCol, offset: 6 }}
          className={styles.buttonContainer}>
          <Button
            type='primary'
            htmlType='submit'
            size='large'
            className={styles.sendButton}>
            SEND
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EmailForm;
