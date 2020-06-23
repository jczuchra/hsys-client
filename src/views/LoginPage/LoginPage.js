import React from 'react';
import { Input, Typography, Form, Checkbox, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { openNotification } from '../../common/functions/openNotification/openNotification';

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      status
      message
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
  const history = useHistory();
  const [
    loginUser,
    { data, loading: mutationLoading, error: mutationError },
  ] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      if (data.login.status) {
        openNotification('Login', data.login.message, 'success');
        return (window.location = '/');
      }
      openNotification('Login', data.login.message, 'error');
    },
  });

  const { Title } = Typography;

  const onFinish = ({ email, password }) => {
    loginUser({
      variables: { password, email },
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className=''>
      <Title className='title'>Login</Title>
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
    </div>
  );
};

export default CreateAccountPage;
