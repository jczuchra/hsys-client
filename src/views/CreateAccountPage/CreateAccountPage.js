import React from 'react';
import { Input, Typography, Form, Checkbox, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import gql from 'graphql-tag';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { useCookies } from 'react-cookie';

import './createAccountPage.scss';

const CREATE_USER = gql`
  mutation RegisterUser($email: String!, $password: String!) {
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

const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 4 },
};
const tailLayout = {
  wrapperCol: { offset: 10, span: 5 },
};

const CreateAccountPage = () => {
  const [
    registerUser,
    { data, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_USER, {
    onCompleted: (data) => setCookie('accessToken', data.register.accessToken),
  });
  const [cookies, setCookie] = useCookies(['accessToken']);

  const [getDeviceCategories, { deviceLoading, deviceData }] = useLazyQuery(
    GET_ALL_DEVICE_CATEGORIES
  );
  const { Title } = Typography;

  const onFinish = ({ email, password }) => {
    registerUser({
      variables: { password, email },
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onSendMe = () => {
    getDeviceCategories();
    console.log('Data', data);
  };

  return (
    <div className=''>
      {/* {console.log('Mutation', data, mutationLoading, mutationError)} */}
      <Title className='title'>Create Account</Title>
      <Form
        {...layout}
        name='basic'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Button onClick={() => onSendMe()}>Send me</Button>
    </div>
  );
};

export default CreateAccountPage;
