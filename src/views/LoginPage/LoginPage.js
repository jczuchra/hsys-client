import React from 'react';
import { Input, Typography, Form, Checkbox, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Hands from '../../assets/hands.jpg';
import { openNotification } from '../../common/functions/openNotification/openNotification';
import { Link } from 'react-router-dom';

import styles from './loginPage.module.scss';

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      status
      message
    }
  }
`;

const CreateAccountPage = () => {
  const history = useHistory();
  const [
    loginUser,
    { data, loading: mutationLoading, error: mutationError },
  ] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      if (data.login.status) {
        openNotification('Login', data.login.message, 'success');
        return history.push('/');
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
    <div className={styles.loginContainer}>
      <img src={Hands} height='100%' width='50%' />
      <div className={styles.formContainer}>
        <Title className={styles.title}>Account login</Title>
        <Form
          name='basic'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            name='email'
            wrapperCol={{ span: 12, offset: 6 }}
            rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input placeholder='Name' />
          </Form.Item>

          <Form.Item
            name='password'
            wrapperCol={{ span: 12, offset: 6 }}
            rules={[
              { required: true, message: 'Please input your password!' },
            ]}>
            <Input.Password placeholder='Password' />
          </Form.Item>

          {/* <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button
              type='primary'
              htmlType='submit'
              className={styles.loginButton}>
              Login
            </Button>
          </Form.Item>
          <Form.Item
            wrapperCol={{ span: 12, offset: 6 }}
            className={styles.infoText}>
            <h3>
              Forgot {<Link to='/'>username</Link>}/
              {<Link to='/'>password</Link>}?
            </h3>
          </Form.Item>
          <Form.Item
            wrapperCol={{ span: 12, offset: 6 }}
            className={styles.infoText}>
            <h3>or</h3>
          </Form.Item>
          <Form.Item
            wrapperCol={{ span: 12, offset: 6 }}
            className={styles.infoText}>
            <h3>Create new account {<Link to='/createAccount'>here</Link>}.</h3>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateAccountPage;
