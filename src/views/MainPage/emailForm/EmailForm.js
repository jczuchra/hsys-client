import React, { useState, useRef } from 'react';
import { Form, Input, InputNumber, Button, Spin } from 'antd';
import { useMutation } from '@apollo/react-hooks';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { CONTACT_EMAIL } from './emailSchemas';
import { openNotification } from '../../../common/functions/openNotification/openNotification';

import styles from './emailForm.module.scss';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 5 },
};

const validateMessages = {
  required: '${name} is required!',
  types: {
    email: '${name} is not validate email!',
    number: '${name} is not a validate number!',
  },
  number: {
    range: '${name} must be between ${min} and ${max}',
  },
};

const EmailForm = () => {
  const formRef = useRef();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [localToken, setLocalToken] = useState();
  const [disabledForm, setDisabledForm] = useState(false);
  const [
    contactEmail,
    { data, loading: mutationLoading, error: mutationError },
  ] = useMutation(CONTACT_EMAIL, {
    onCompleted: (data) => {
      setDisabledForm(false);
      formRef.current.resetFields();
      openNotification(
        'Email',
        data.contactEmail.message,
        data.contactEmail.success ? 'success' : 'error'
      );
    },
  });

  const onFinish = (values) => {
    setDisabledForm(true);
    if (localToken) {
      return contactEmail({ variables: { ...values, token: localToken } });
    }
    executeRecaptcha('emailForm').then((token) => {
      setLocalToken(token);
      contactEmail({ variables: { ...values, token } });
    });
  };

  return (
    <div className={styles.emailContainer}>
      <Form
        ref={formRef}
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
          <Input placeholder='Name' disabled={disabledForm} />
        </Form.Item>
        <Form.Item
          name='email'
          rules={[{ type: 'email' }]}
          wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
          <Input placeholder='Email' disabled={disabledForm} />
        </Form.Item>
        <Form.Item
          name='phone'
          rules={[{ type: 'number' }]}
          wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
          <InputNumber placeholder='Phone number' disabled={disabledForm} />
        </Form.Item>
        <Form.Item
          name='message'
          wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
          <Input.TextArea placeholder='Message' disabled={disabledForm} />
        </Form.Item>
        <Form.Item
          wrapperCol={{ ...layout.wrapperCol, offset: 6 }}
          className={styles.buttonContainer}>
          <Button
            type='primary'
            htmlType='submit'
            size='large'
            disabled={disabledForm}
            className={styles.sendButton}>
            SEND
          </Button>
          {mutationLoading && <Spin size='large' className={styles.spinner} />}
        </Form.Item>
      </Form>
      )}
    </div>
  );
};

export default EmailForm;
