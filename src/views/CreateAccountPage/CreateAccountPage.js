import React from 'react';
import { Input, Typography, Form, Checkbox, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { openNotification } from '../../common/functions/openNotification/openNotification';
import Hands from '../../assets/hands2.jpg';

import styles from './createAccountPage.module.scss';
import './createAccountPage.scss';

const CREATE_USER = gql`
  mutation registerUser($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      status
      message
    }
  }
`;

const GET_ALL_DEVICE_CATEGORIES = gql`
  query allDeviceCategories {
    allDeviceCategories {
      allElements {
        id
        name
        quantity
      }
      info {
        success
        message
      }
    }
  }
`;

const CreateAccountPage = () => {
  const history = useHistory();
  const [
    registerUser,
    { data, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      openNotification('Register', data.register.message);
      window.location = '/';
    },
  });

  const { Title } = Typography;

  const onFinish = ({ email, password }) => {
    registerUser({
      variables: { password, email },
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.createContainer}>
      <img src={Hands} height='100%' width='50%' />
      <div className={styles.formContainer}>
        <Title className={styles.title}>Create Account</Title>
        <Form
          name='basic'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            name='email'
            wrapperCol={{ span: 12, offset: 6 }}
            rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input placeholder='Email' />
          </Form.Item>

          <Form.Item
            name='password'
            wrapperCol={{ span: 12, offset: 6 }}
            rules={[
              { required: true, message: 'Please input your password!' },
            ]}>
            <Input.Password placeholder='Password' />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button
              type='primary'
              htmlType='submit'
              className={styles.loginButton}>
              Create account
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateAccountPage;
